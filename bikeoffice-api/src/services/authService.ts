import { sequelize } from "@bikeoffice/types";

// need to 
async function validateUser(username: string, password: string): Promise<boolean> {
    const isValidSchema = await checkSchemaExists(username);
    return isValidSchema;
}

async function checkSchemaExists(schemaName: string) {
    const schemas = await sequelize.getQueryInterface().showAllSchemas();
    return Array.from(schemas as string[]).includes(schemaName);
}

/**
 * app.get("/schema", (req, res) => {
  const schema = req.query.schema;
  res.cookie("schema", schema, { 
    maxAge: 900000, 
    httpOnly: true, 
    sameSite: 'strict', // Set sameSite to 'strict' to prevent CSRF attacks
    secure: true // Set secure to true when using HTTPS
  });
  res.send({ message: 'Schema set' });
});

 */

export { validateUser }
