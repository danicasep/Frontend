import { Button, ButtonGroup, ButtonPropsColorOverrides, Stack, SxProps, Theme } from "@mui/material";
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers";
import { OverridableStringUnion } from '@mui/types';

export interface ICustomPagination {
  /**
   * Ketika pagination diklik atau berubah
   * @param page number
   * @returns void
   */
  onChange: (page: number) => void;
  /**
   * Halaman/page saat ini
   */
  currentPage: number;

  /**
   * Total data keseluruhan
   */
  total: number;

  /**
   * Per Halaman
   */
  perPage: number;

  /**
   * Posisi Paginasi
   */
  align?: "left" | "center" | "right";

  sx?: SxProps<Theme>;

  color?: OverridableStringUnion<
    'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    ButtonPropsColorOverrides
  >
}

export const CustomPagination = (props: ICustomPagination) => {
  const { currentPage, onChange, perPage, total, align, sx, color = "primary" } = props;

  const totalPages = Math.ceil(total / perPage);

  const listPages = [];

  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) listPages.push(i);
  } else {
    // Always print first page button
    listPages.push(1)

    // Print "..." only if currentPage is > 3
    if (currentPage > 3) {
      listPages.push("...");
    }

    // special case where last page is selected...
    if (currentPage == totalPages) {
      listPages.push(currentPage - 3)
    }

    // Print previous number button if currentPage > 2
    if (currentPage > 2) {
      if (currentPage > 4) listPages.push(currentPage - 2);
      listPages.push(currentPage - 1);
    }

    //Print current page number button as long as it not the first or last page
    if (currentPage != 1 && currentPage != totalPages) {
      listPages.push(currentPage)
    }

    if (currentPage < totalPages - 1) {
      listPages.push(currentPage + 1);
      if (currentPage < totalPages - 3 && currentPage > 3) listPages.push(currentPage + 2);
    }
    // special case where first page is selected...
    if (currentPage == 1) {
      listPages.push(currentPage + 2);
    }

    //print "..." if currentPage is < lastPage -2
    if (currentPage < totalPages - 2) {
      listPages.push("...")
    }

    listPages.push(totalPages)
  }

  const changePage = (page: number) => {
    if (currentPage != page) onChange(page);
  }

  let alignItems = null;
  if (align == "right") alignItems = "end";
  else if (align == "center") alignItems = "center";
  else alignItems = "start";

  return <>
    <Stack sx={sx} alignItems={alignItems}>
      <Stack flexDirection={"row"} alignItems="center">
        <ButtonGroup>
          <Button color={color} variant="text" size="small" disabled={currentPage == 1 || totalPages == 0} onClick={() => changePage(currentPage - 1)}>
            <ArrowLeftIcon />
          </Button>
          {listPages.map(page => {
            if (typeof page === 'string') return <Button variant="text" size="small" color={color} disabled>...</Button>;
            return <Button variant={currentPage == page ? "contained" : "text"} color={color} size="small" onClick={() => changePage(page)}>{page}</Button>
          })}
          <Button color={color} variant="text" size="small" disabled={currentPage == totalPages || totalPages == 0} onClick={() => changePage(currentPage + 1)}>
            <ArrowRightIcon />
          </Button>
        </ButtonGroup>
      </Stack>
    </Stack>
  </>
}