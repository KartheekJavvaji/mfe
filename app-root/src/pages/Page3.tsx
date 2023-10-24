import { memo } from "react";
import dayjs from "dayjs";
import Stack from "@components/atoms/Stack";
import Typography from "@components/atoms/Typography";
import StaticDateRangePicker from "@components/molecules/DateRange/StaticDateRangePicker";
import MultiInputDateTimeRangeField from "@components/molecules/DateRange/MultiInputDateTimeRangeField";

import type {
  DateRange,
  PickersShortcutsItem,
} from "@components/molecules/DateRange/types";
import type { Dayjs } from "dayjs";

export type TDate = Dayjs;
type CustomDateRangePickerToolbarProps = any;

function CustomDateRangePickerToolbar(
  props: CustomDateRangePickerToolbarProps,
) {
  const { onChange, value, disabled } = props;
  return (
    <Stack
      sx={{
        gridColumn: "span 2",
        pr: "1.6rem",
        pt: "1.6rem",
      }}
      direction="row"
      justifyContent="flex-end"
    >
      <MultiInputDateTimeRangeField
        sx={{
          width: "36rem",
        }}
        value={value}
        onChange={onChange}
        disabled={disabled}
        slotProps={{
          textField: ({ position }) => ({
            label: position === "start" ? "From" : "To",
          }),
        }}
      />
    </Stack>
  );
}

const shortcutsItems: PickersShortcutsItem<DateRange<Dayjs>>[] = [
  {
    label: "This Week",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("week"), today.endOf("week")];
    },
  },
  {
    label: "Last Week",
    getValue: () => {
      const today = dayjs();
      const prevWeek = today.subtract(7, "day");
      return [prevWeek.startOf("week"), prevWeek.endOf("week")];
    },
  },
  {
    label: "Last 7 Days",
    getValue: () => {
      const today = dayjs();
      return [today.subtract(7, "day"), today];
    },
  },
  {
    label: "Current Month",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("month"), today.endOf("month")];
    },
  },
  {
    label: "Next Month",
    getValue: () => {
      const today = dayjs();
      const startOfNextMonth = today.endOf("month").add(1, "day");
      return [startOfNextMonth, startOfNextMonth.endOf("month")];
    },
  },
  { label: "Reset", getValue: () => [null, null] },
];

function Page3() {
  return (
    <Stack>
      <Typography>
        local app | needs root to have singleton LocalizationProvider
      </Typography>

      <StaticDateRangePicker
        slotProps={{
          shortcuts: {
            items: shortcutsItems,
          },
          actionBar: { actions: [] },
        }}
        slots={{
          toolbar: CustomDateRangePickerToolbar,
        }}
        calendars={2}
        defaultValue={[null, null]}
        sx={{
          width: "min-content",
          m: 2,
        }}
      />
    </Stack>
  );
}

export default memo(Page3);
