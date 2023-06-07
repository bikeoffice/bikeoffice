interface DynamicInputProps {
	id?: any;
	name: string;
	value?: any;
	setValue: any;
	afterChange?: any;
	minWidth?: number;
	maxValue?: number;
	growth?: number;
}

function validate(input: string) {
	input = input.replace(",", "|");

	if (input.endsWith("|")) {
		input += "5";
	}

	if (input.endsWith(".")) {
		input = input.slice(0, -1);
	}

	input = input.replace("|", ".");
	if (input.startsWith(".")) {
		input = "0" + input;
	}
	return input.replace(/[^0-9.]/g, "");
}

const toInt = (f: any) => (f % 1 === 0 ? parseInt(f).toString() : f);

export const DynamicInput: React.FC<DynamicInputProps> = ({ name, id, value, setValue, afterChange, minWidth, maxValue, growth }) => {
	const onChange = (e: any) => {
		let value = parseFloat(validate(e.target.value) || "0").toString();
		if (value && maxValue && parseFloat(value) > maxValue) {
			value = maxValue.toString();
		}
		document.querySelector(`*[id='${id}'] input[name='${name}']`)?.setAttribute("style", `width: ${(growth ?? 0) * (value.length ?? 0) + (minWidth ?? 30)}px;`);
		setValue(id, name, value);
	};

	return (
		<span id={name}>
			<input
				type="text"
				name={name}
				value={toInt(value) ?? "0"}
				onChange={onChange}
				onBlur={e => afterChange && afterChange(id, e.target.value)}
				style={{ width: (growth ?? 0) * (value?.toString().length ?? 0) + (minWidth ?? 30) }}
			/>
		</span>
	);
};
