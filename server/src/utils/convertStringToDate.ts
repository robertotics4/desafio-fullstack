function convertStringToDate(strDate: string): Date {
  if (strDate) {
    const separator = strDate.replace(/[0-9]/g, '');

    const splittedDate = strDate.split(separator[0]);
    const date = new Date(
      Number(splittedDate[2]),
      Number(splittedDate[1]) - 1,
      Number(splittedDate[0]),
    );

    return date;
  }

  return undefined;
}

export { convertStringToDate };
