type PropsType = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function Form({value,setValue,handleSubmit}:PropsType) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <form  onSubmit={handleSubmit} className="flex pt-2">
      <input
        className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
        type="text"
        name="value"
        style={{ flex: "10", padding: "5px" }}
        placeholder="해야할 일을 입력하세요."
        value={value}
        onChange={handleChange}
      />
      <input type="submit" value="입력"  className="p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200"/>
    </form>
  );
}
