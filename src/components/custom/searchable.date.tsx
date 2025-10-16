import { isView } from "@/config/view";
import FormatDate from "@/core/helper/formatDate";
import { useCustomState } from "@/core/helper/state.helper";
import { Box, MenuItem, OutlinedInput, Select, SxProps, Theme } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect } from "react";

interface ISearchableDate {
  disabled?: boolean;
  sx?: SxProps<Theme>;
  onChange: (firstPeriod: Date, lastPeriod: Date) => void;
}

export const SearchableDate = (params: ISearchableDate) => {

  const { onChange, disabled, sx } = params;

  const now = new Date();

  const { state, setState } = useCustomState<{
    firstPeriod?: string,
    lastPeriod?: string,
    type?: string, // "dialy" | "monthly" | "yearly",
    selectedFirstPeriod?: string;
    selectedLastPeriod?: string;
    selectedMonthly?: string;
    selectedMonthlyYear?: string;
    selectedYear?: string;
  }>({
    firstPeriod: FormatDate(now, "Y-m-d"),
    lastPeriod: FormatDate(now, "Y-m-d"),
    type: "dialy",
    selectedFirstPeriod: FormatDate(now, "Y-m-d"),
    selectedLastPeriod: FormatDate(now, "Y-m-d"),
    selectedMonthly: FormatDate(now, "F"),
    selectedMonthlyYear: FormatDate(now, "Y"),
    selectedYear: FormatDate(now, "Y")
  });

  const months: string[] = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const years = () => {
    const startYear = now.getFullYear() - 5;
    const endYear = now.getFullYear() + 1;
    let _years: number[] = [];
    for (let i = startYear; i <= endYear; i++) {
      _years.push(i)
    }
    return _years;
  }

  const isMobileView = isView("mobile");

  useEffect(() => {
    const firstPeriod = new Date(state?.firstPeriod);
    const lastPeriod = new Date(state?.lastPeriod);
    if (state?.type == "dialy") onChange(firstPeriod, lastPeriod);
  }, [state?.type, state?.firstPeriod, state?.lastPeriod]);

  useEffect(() => {
    const month = months.findIndex(month => month == state?.selectedMonthly);
    const firstPeriod = new Date(`${state?.selectedMonthlyYear}-${month + 1}-01`);
    const lastPeriod = new Date(parseInt(state?.selectedMonthlyYear), month + 1, 0);
    if (state?.type == "monthly") onChange(firstPeriod, lastPeriod);
  }, [state?.type, state?.selectedMonthly, state?.selectedMonthlyYear]);

  useEffect(() => {
    const firstPeriod = new Date(`${state?.selectedYear}-01-01`);
    const lastPeriod = new Date(parseInt(state?.selectedYear), 12, 0);
    if (state?.type == "yearly") onChange(firstPeriod, lastPeriod);
  }, [state?.type, state?.selectedYear]);

  return <>
    <Box sx={{ display: "flex", flexDirection: isMobileView ? 'column' : 'row', fontFamily: 'Montserrat, sans-serif' }}>
      <Select
        displayEmpty
        size="small"
        style={{ marginRight: isMobileView ? 0 : 20, marginBottom: isMobileView ? 20 : 0 }}
        sx={sx}
        disabled={disabled}
        value={state?.type}
        onChange={(evt) => setState({ type: evt.target.value })}
      >
        <MenuItem value="dialy">Periode</MenuItem>
        <MenuItem value="monthly">Bulan</MenuItem>
        <MenuItem value="yearly">Tahun</MenuItem>
      </Select>
      {state?.type == "dialy" ? <>
        <DatePicker format="DD-MM-YYYY" value={dayjs(state?.firstPeriod)} slotProps={{ textField: { size: 'small' } }} sx={{ width: isMobileView ? "100%" : "170px", mr: 3, mb: isMobileView ? 3 : 0 }} onChange={(date) => { setState({ firstPeriod: date.format("YYYY-MM-DD") }) }} />
        <DatePicker format="DD-MM-YYYY" value={dayjs(state?.lastPeriod)} slotProps={{ textField: { size: 'small' } }} sx={{ width: isMobileView ? "100%" : "170px" }} onChange={(date) => { setState({ lastPeriod: date.format("YYYY-MM-DD") }) }} />
      </> : null}
      {state?.type == "monthly" ? <>
        <Select
          size="small"
          displayEmpty
          style={{ marginRight: isMobileView ? 0 : 20, marginBottom: isMobileView ? 20 : 0 }}
          disabled={disabled}
          value={state?.selectedMonthly}
          onChange={(value) => setState({
            selectedMonthly: value.target.value
          })}
        >
          {months?.map(month => <MenuItem value={month.toString()}>{month}</MenuItem>)}
        </Select>
        <Select
          size="small"
          disabled={disabled}
          value={state?.selectedMonthlyYear}
          onChange={(value) => setState({
            selectedMonthlyYear: value.target.value
          })}
        >
          {years()?.map(year => <MenuItem value={year.toString()}>{year}</MenuItem>)}
        </Select>
      </> : null}
      {state?.type == "yearly" ? <>
        <Select
          size="small"
          disabled={disabled}
          value={state?.selectedYear}
          onChange={(value) => setState({
            selectedYear: value.target.value
          })}
        >
          {years()?.map(year => <MenuItem value={year.toString()}>{year}</MenuItem>)}
        </Select>
      </> : null}
    </Box>
  </>
}