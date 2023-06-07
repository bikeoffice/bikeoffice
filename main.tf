###########
# Create delegation set ONCE, then comment out this part
# So that the domain is always pointing to the same NameServers
# Remember -> Check output of apply to get the ID for the VARIABLE block
#		      and the NameServers to assign
# IMPORTANT -> CHANGE VARIABLE AND ZONE
###########
# resource "aws_route53_delegation_set" "bikeoffice" {
#   reference_name = "BikeOffice"
# }
#
# output "delegation_set_id" {
#   value = aws_route53_delegation_set.bikeoffice.id
# }
#
# output "nameservers" {
#   value = aws_route53_delegation_set.bikeoffice.name_servers
# }
###########
# END
###########

variable "delegation_set_id" {
  type        = string
  description = "Delegation Set ID"
  default     = ""
}

# DNS Name Servers
resource "aws_route53_zone" "production" {
  name = "bikeoffice.net"
  delegation_set_id = var.delegation_set_id
  #delegation_set_id = aws_route53_delegation_set.bikeoffice.id
}

resource "aws_route53_zone" "development" {
  name = "test.bikeoffice.net"

  tags = {
	Environment = "development"
  }
}

resource "aws_route53_record" "development-ns" {
  zone_id = aws_route53_zone.production.zone_id
  name    = "test.bikeoffice.net"
  type    = "NS"
  ttl     = "30"
  records = aws_route53_zone.development.name_servers
}

# Get a static public IP
resource "aws_eip" "production" {
  vpc = true
}

# Create a DNS record that maps to the public IP
resource "aws_route53_record" "production" {
  zone_id = aws_route53_zone.production.zone_id
  name    = "bikeoffice.net"
  type    = "A"
  ttl     = 300
  records = [aws_eip.production.public_ip]
}


### Network Configurations ###
# Main VPC
resource "aws_vpc" "bikeoffice" {
  cidr_block = "98.105.0.0/16"
}

# VPC Routing table
resource "aws_route_table" "bikeoffice" {
  vpc_id = aws_vpc.bikeoffice.id
}

# Internet GateWay (needed to connect the vpc to the internet)
resource "aws_internet_gateway" "bikeoffice" {
  vpc_id = aws_vpc.bikeoffice.id
}

# Production Subnet
resource "aws_subnet" "production" {
  vpc_id     = aws_vpc.bikeoffice.id
  cidr_block = "98.105.107.0/24"
  availability_zone = "us-east-1a"
}

resource "aws_subnet" "_" {
  vpc_id     = aws_vpc.bikeoffice.id
  cidr_block = "98.105.108.0/24"
  availability_zone = "us-east-1b"
}

# Let the subnet connect with the internet
resource "aws_route" "internet_connection" {
  route_table_id         = aws_route_table.bikeoffice.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.bikeoffice.id
}

# Connect the table with the subnet
resource "aws_route_table_association" "production" {
  subnet_id      = aws_subnet.production.id
  route_table_id = aws_route_table.bikeoffice.id
}


### ECR and ECS ###
# ECR Repository
resource "aws_ecr_repository" "bikeoffice_web" {
   name = "bikeoffice-web"
   image_tag_mutability = "MUTABLE"
}

resource "aws_ecr_repository" "bikeoffice_api" {
   name = "bikeoffice-api"
   image_tag_mutability = "MUTABLE"
}

# ECS cluster
resource "aws_ecs_cluster" "production" {
  name = "production"
  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

resource "aws_cloudwatch_log_group" "production" {
    name = "production"
}

# ECS Task Definition
resource "aws_ecs_task_definition" "production" {
  family                   = "production"
  cpu                      = 256
  memory                   = "512"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  execution_role_arn       = aws_iam_role.ecs_task_execution.arn
  task_role_arn            = aws_iam_role.ecs_task_execution.arn

  container_definitions = jsonencode([
    {
      name         = "bikeoffice-web"
      image        = "${aws_ecr_repository.bikeoffice_web.repository_url}:latest"
      portMappings = [
        {
          containerPort = 80
          protocol      = "tcp"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          awslogs-group         = aws_cloudwatch_log_group.production.name,
          awslogs-region        = "us-east-1",
          awslogs-stream-prefix = "api"
        }
      }
      essential    = true
    },
    {
      name         = "bikeoffice-api"
      image        = "${aws_ecr_repository.bikeoffice_api.repository_url}:latest"
      portMappings = [
        {
          containerPort = 3000
          protocol      = "tcp"
        }
      ]
      environment  = [
        {
          name  = "DB_ENDPOINT"
          value = aws_db_instance.production.endpoint
        }
      ]
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          awslogs-group         = aws_cloudwatch_log_group.production.name,
          awslogs-region        = "us-east-1",
          awslogs-stream-prefix = "api"
        }
      }
      essential    = true
    }
  ])
}

# ECS Service to run the task
resource "aws_ecs_service" "production" {
  name            = "production"
  cluster         = aws_ecs_cluster.production.id
  task_definition = aws_ecs_task_definition.production.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  load_balancer {
    target_group_arn = aws_lb_target_group.production.arn
    container_name   = "bikeoffice-web"
    container_port   = 80
  }

  network_configuration {
      assign_public_ip = true
      subnets          = [aws_subnet.production.id]
      security_groups  = [aws_security_group.production.id]
  }
}


### Endpoints ###
resource "aws_vpc_endpoint" "ecr" {
  vpc_id            = aws_vpc.bikeoffice.id
  service_name      = "com.amazonaws.us-east-1.ecr.dkr"
  vpc_endpoint_type = "Interface"

  security_group_ids = [aws_security_group.production.id]
  subnet_ids         = [aws_subnet.production.id]
}

resource "aws_vpc_endpoint" "ecr_api" {
  vpc_id            = aws_vpc.bikeoffice.id
  service_name      = "com.amazonaws.us-east-1.ecr.api"
  vpc_endpoint_type = "Interface"

  security_group_ids = [aws_security_group.production.id]
  subnet_ids         = [aws_subnet.production.id]
}

# Create a security group to allow inbound traffic
resource "aws_security_group" "production" {
  name        = "production"
  description = "Allow inbound traffic for production"

  vpc_id = aws_vpc.bikeoffice.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port        = 5432
    to_port          = 5432
    protocol         = "tcp"
    self             = true
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


### Load Balancer ###
# Create an Application Load Balancer
resource "aws_lb" "production" {
  name               = "production"
  load_balancer_type = "network"
  subnet_mapping {
    subnet_id     = aws_subnet.production.id
    allocation_id = aws_eip.production.id
  }

}

# Create a listener to redirect traffic from port 80 to the target group
resource "aws_lb_listener" "production" {
  load_balancer_arn = aws_lb.production.arn
  port              = 80
  protocol          = "TCP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.production.arn
  }
}

# Create a target group to forward traffic to the ECS service
resource "aws_lb_target_group" "production" {
  name     = "production"
  port     = 80
  protocol = "TCP"
  vpc_id   = aws_vpc.bikeoffice.id
  target_type = "ip"

  health_check {
    path = "/"
    port = "traffic-port"
  }
}


### DB ###
resource "aws_db_instance" "production" {
  allocated_storage    = 10
  db_name              = "bikeoffice"
  engine               = "postgres"
  instance_class       = "db.t3.micro"
  username             = "bikeoffice"
  password             = "bikeoffice"
  skip_final_snapshot  = true
  db_subnet_group_name = aws_db_subnet_group.production.name
  identifier           = "bikeoffice-production"
  vpc_security_group_ids = [aws_security_group.production.id]
}

resource "aws_db_subnet_group" "production" {
  name       = "production"
  subnet_ids = [aws_subnet.production.id, aws_subnet._.id]
}


### IAM ###
resource "aws_iam_role" "ecs_task_execution" {
  name = "ecsTaskExecutionRole"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_policy_attachment" "task_execution_role_attachment" {
  name       = "TaskExecutionRoleAttachment"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
  roles      = [aws_iam_role.ecs_task_execution.name]
}
