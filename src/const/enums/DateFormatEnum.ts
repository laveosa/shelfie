export enum DateFormatEnum {
  // Year formats
  YYYY = "YYYY",

  // Year-Month formats
  YYYYMM = "YYYYMM",
  YYYY_MM = "YYYY-MM",

  // Month/Day formats
  M_D = "M/D",
  MM_DD = "MM/DD",

  // Full Date formats
  YYYYMMDD = "YYYYMMDD",
  YYYY_MM_DD = "YYYY-MM-DD",
  YYYY__MM__DD = "YYYY_MM_DD",
  YYYY_DOT_MM_DOT_DD = "YYYY.MM.DD",
  M_D_YY = "M/D/YY",
  MM_DD_YY = "MM/DD/YY",
  MM_DD_YYYY = "MM/DD/YYYY",
  DD_MMM_YY = "DD MMM YY",
  DD_MMM_YYYY = "DD MMM YYYY",
  DD_MMMM_YYYY = "DD MMMM YYYY",
  MMM_D_YY = "MMM D, YY",
  MMM_D_YYYY = "MMM D, YYYY",
  MMM_DD_YYYY = "MMM DD, YYYY",
  MMMM_D_YYYY = "MMMM D, YYYY",
  MMMM_DD_YYYY = "MMMM DD, YYYY",

  // Date + Time (no seconds)
  YYYYMMDDHHmm = "YYYYMMDDHHmm",
  YYYYMMDD_HHmm = "YYYYMMDD_HHmm",
  YYYY_DOT_MM_DOT_DD_HHmm = "YYYY.MM.DD.HHmm",
  YYYY_MM_DD_HHmm = "YYYY-MM-DD-HHmm",
  YYYY_MM_DD__HHmm = "YYYY-MM-DD_HHmm",
  YYYY_DOT_MM_DOT_DD_HH_DOT_mm = "YYYY.MM.DD.HH.mm",
  YYYY_MM_DD_HH_mm = "YYYY-MM-DD-HH-mm",
  YYYY_MM_DD_HH_mm_SPACE = "YYYY-MM-DD HH:mm",
  YYYY_MM_DD_H_mm_A = "YYYY-MM-DD h:mm A",
  YYYY_MM_DD_HH_mm_A = "YYYY-MM-DD hh:mm A",
  YYYY_MM_DD_AT_H_mm_A = "YYYY-MM-DD @ h:mm A",

  // Date + Time + Seconds
  YYYYMMDDHHmmss = "YYYYMMDDHHmmss",
  YYYY_DOT_MM_DOT_DD_HHmmss = "YYYY.MM.DD.HHmmss",
  YYYY_MM_DD_HHmmss = "YYYY-MM-DD-HHmmss",
  YYYY_MM_DD__HHmmss = "YYYY-MM-DD_HHmmss",
  YYYY_MM_DD__HHmm_ss = "YYYY-MM-DD_HHmm.ss",
  YYYY_DOT_MM_DOT_DD_HH_mm_ss = "YYYY.MM.DD.HH.mm.ss",
  YYYY_MM_DD_HH_mm_ss = "YYYY-MM-DD-HH-mm-ss",
  YYYY_MM_DD_HH_mm_ss_SPACE = "YYYY-MM-DD HH:mm:ss",
  YYYY_MM_DD_HH_mm_dot_ss = "YYYY-MM-DD HH:mm.ss",
  YYYY_MM_DD_h_mm_ss_A = "YYYY-MM-DD h:mm:ss A",
  YYYY_MM_DD_hh_mm_ss_A = "YYYY-MM-DD hh:mm:ss A",
  YYYY_MM_DD_AT_h_mm_ss_A = "YYYY-MM-DD @ h:mm:ss A",

  // Descriptive with weekday
  dd_MMM_D_YY = "dd MMM D YY",
  ddd_MMM_D_YY = "ddd MMM D YY",
  ddd_MMM_D_YYYY = "ddd MMM D YYYY",
  ddd_MMM_DD_YYYY = "ddd MMM DD YYYY",
  dddd_MMM_D_YYYY = "dddd, MMM D YYYY",
  dddd_MMMM_D_YYYY = "dddd, MMMM D, YYYY",
  dddd_MMMM_DD_YYYY = "dddd, MMMM DD, YYYY",

  // Time only
  h_mm_A = "h:mm A",
  hh_mm_A = "hh:mm A",
  AT_h_mm_A = "@ h:mm A",

  // Descriptive + time
  ddd_MMM_D_YY_h_mm_A = "ddd MMM D YY h:mm A",
  ddd_MMM_D_YYYY_h_mm_A = "ddd MMM D YYYY h:mm A",
  ddd_MMM_DD_YYYY_h_mm_A = "ddd MMM DD YYYY h:mm A",
  dddd_MMM_D_YYYY_h_mm_A = "dddd, MMM D YYYY h:mm A",
  dddd_MMMM_D_YYYY_h_mm_A = "dddd, MMMM D, YYYY h:mm A",
  dddd_MMMM_DD_YYYY_h_mm_A = "dddd, MMMM DD, YYYY h:mm A",

  ddd_MMM_D_YY_hh_mm_A = "ddd MMM D YY hh:mm A",
  ddd_MMM_D_YYYY_hh_mm_A = "ddd MMM D YYYY hh:mm A",
  ddd_MMM_DD_YYYY_hh_mm_A = "ddd MMM DD YYYY hh:mm A",
  dddd_MMM_D_YYYY_hh_mm_A = "dddd, MMM D YYYY hh:mm A",
  dddd_MMMM_D_YYYY_hh_mm_A = "dddd, MMMM D, YYYY hh:mm A",
  dddd_MMMM_DD_YYYY_hh_mm_A = "dddd, MMMM DD, YYYY hh:mm A",

  ddd_MMM_D_YY_AT_h_mm_A = "ddd MMM D YY @ h:mm A",
  ddd_MMM_D_YYYY_AT_h_mm_A = "ddd MMM D YYYY @ h:mm A",
  ddd_MMM_DD_YYYY_AT_h_mm_A = "ddd MMM DD YYYY @ h:mm A",
  dddd_MMM_D_YYYY_AT_h_mm_A = "dddd, MMM D YYYY @ h:mm A",
  dddd_MMMM_D_YYYY_AT_h_mm_A = "dddd, MMMM D, YYYY @ h:mm A",
  dddd_MMMM_DD_YYYY_AT_h_mm_A = "dddd, MMMM DD, YYYY @ h:mm A",
}
