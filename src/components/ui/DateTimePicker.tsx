import dayjs from "dayjs";
import { RangePickerProps } from "antd/es/date-picker";
import { DatePicker } from "antd";

const DateTimePicker = ({
  value,
  onChange,
}: {
  value: Date;
  onChange: (value: Date) => void;
}) => {
  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };

  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56],
  });
  return (
    <div className="flex flex-col space-y-1">
      <span className="flex items-center space-x-1">
        <label htmlFor="duration">Date/time</label>
        <span className="text-red-500">*</span>
      </span>
      <DatePicker
        format="YYYY-MM-DD HH:mm:ss"
        disabledDate={disabledDate}
        disabledTime={disabledDateTime}
        value={dayjs(value)}
        onChange={(date) => {
          onChange(date?.toDate() || value);
        }}
        showTime={{ defaultValue: dayjs("00:00:00", "HH:mm:ss") }}
      />
    </div>
  );
};

export default DateTimePicker;
