import jsPDF from "jspdf";
import dayjs from "dayjs";
import autoTable, { CellDef, CellInput } from "jspdf-autotable";
import type { EventInput } from "@fullcalendar/core";
import CourseModel from "../../../models/Course.model";
import SemesterModel from "../../../models/Semester.model";
import ProgramModel from "../../../models/Program.model";
import VenueModel from "../../../models/Venue.model";
import TimetableModel from "../../../models/Timetable.model";

export const print = (
  events: EventInput[],
  {
    selectedCourse,
    selectedSemester,
    selectedProgram,
    selectedVenue,
    selectedTimetable,
    selectedStartDate,
    selectedEndDate,
  }: {
    selectedCourse?: CourseModel;
    selectedSemester?: SemesterModel;
    selectedProgram?: ProgramModel;
    selectedVenue?: VenueModel;
    selectedTimetable?: TimetableModel;
    selectedStartDate?: Date;
    selectedEndDate?: Date;
  }
) => {
  const columns: CellInput[] = [
    "Date",
    "Course",
    "Lecturer",
    "Venue",
    "Program",
    "Semester",
  ];

  const rows: Array<CellDef[]> = [];

  // sort the events by date
  events.sort((a, b) => {
    if (a.extendedProps?.meeting && b.extendedProps?.meeting) {
      return dayjs(a.extendedProps.meeting.date).isBefore(
        b.extendedProps.meeting.date
      )
        ? -1
        : 1;
    }

    if (a.extendedProps?.holiday && b.extendedProps?.holiday) {
      return dayjs(a.extendedProps.holiday.startDate).isBefore(
        b.extendedProps.holiday.startDate
      )
        ? -1
        : 1;
    }

    if (a.extendedProps?.meeting && b.extendedProps?.holiday) {
      return dayjs(a.extendedProps.meeting.date).isBefore(
        b.extendedProps.holiday.startDate
      )
        ? -1
        : 1;
    }

    if (a.extendedProps?.holiday && b.extendedProps?.meeting) {
      return dayjs(a.extendedProps.holiday.startDate).isBefore(
        b.extendedProps.meeting.date
      )
        ? -1
        : 1;
    }

    return 0;
  });

  events.forEach((event) => {
    const meeting = event.extendedProps?.meeting;

    if (meeting) {
      const day = dayjs(meeting.date).format("dddd");
      const date = dayjs(meeting.date).format("DD/MM/YYYY");

      // check if the meeting is within the selected date range
      if (
        selectedStartDate &&
        selectedEndDate &&
        (dayjs(meeting.date).isBefore(selectedStartDate) ||
          dayjs(meeting.date).isAfter(selectedEndDate))
      ) {
        return;
      }

      rows.push([
        `9:00 AM - 5:00 PM ${day} ${date}`,
        meeting?.course?.name,
        meeting?.course?.lecturer?.name,
        meeting?.venue?.name,
        meeting?.timetable?.program?.name,
        meeting?.timetable?.semester?.name,
      ]);
    }

    const holiday = event.extendedProps?.holiday;

    if (holiday) {
      const startDate = dayjs(holiday.startDate);
      const endDate = dayjs(holiday.endDate);

      // check if the holiday start date is within the selected date range
      if (
        selectedStartDate &&
        selectedEndDate &&
        (startDate.isBefore(selectedStartDate) ||
          startDate.isAfter(selectedEndDate))
      ) {
        return;
      }

      const startDay = startDate.format("dddd");
      const endDay = endDate.format("dddd");
      const startDateFormatted = startDate.format("DD/MM/YYYY");
      const endDateFormatted = endDate.format("DD/MM/YYYY");

      rows.push([
        {
          content: `${startDay} ${startDateFormatted} - ${endDay} ${endDateFormatted} / ${holiday.name}`,
          colSpan: 6,
          styles: {
            halign: "center",
          },
        },
      ]);
    }
  });

  const doc = new jsPDF();

  const title = "Timetable";
  doc.setFontSize(20);
  doc.text(title, 14, 15);

  // printed on
  doc.setFontSize(10);
  doc.text(`Generated on ${dayjs().format("DD/MM/YYYY")}`, 14, 20);

  const filters = [];

  if (selectedCourse) {
    filters.push(`Course: ${selectedCourse?.name}`);
  }

  if (selectedVenue) {
    filters.push(`Venue: ${selectedVenue?.name}`);
  }

  if (selectedSemester) {
    filters.push(`Semester: ${selectedSemester?.name}`);
  }

  if (selectedProgram) {
    filters.push(`Program: ${selectedProgram?.name}`);
  }

  if (selectedTimetable) {
    filters.push(`Timetable: ${selectedTimetable?.name}`);
  }

  if (selectedStartDate && selectedEndDate) {
    filters.push(
      `Date: ${dayjs(selectedStartDate).format("DD/MM/YYYY")} - ${dayjs(
        selectedEndDate
      ).format("DD/MM/YYYY")}`
    );
  }

  if (filters.length > 0) {
    doc.setFontSize(14);
    doc.text(filters.join("\n"), 14, 25);
  }

  autoTable(doc, {
    head: [columns],
    body: rows,
    startY: filters.length > 0 ? 50 : 25,
  });

  // open pdf in new tab
  doc.output("dataurlnewwindow");
};
