/* eslint-disable react/prop-types */
const Rating = ({ filterForm, onChangeFormField }) => {
  const options = [
    {
      id: "above",
      label: "Above average",
      value: "above",
    },
    {
      id: "below",
      label: "Below average",
      value: "below",
    },
  ];
  return (
    <>
      <div className={"flex flex-col gap-y-4"}>
        {options.map((item, index) => (
          <div key={index} className="flex items-center gap-x-2">
            <input
              type={"checkbox"}
              id={item.id}
              checked={filterForm.rating === item.value}
              onChange={() => onChangeFormField(item.value, "rating")}
            />
            <label htmlFor={item.id}>{item.label}</label>
          </div>
        ))}
      </div>
    </>
  );
};
export default Rating;
