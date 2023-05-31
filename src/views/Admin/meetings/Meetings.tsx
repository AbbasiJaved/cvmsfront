import * as React from "react";
import {
  Button,
  Select,
  Spin,
  Space,
  Empty,
  Typography,
  Tooltip,
  DatePicker,
} from "antd";
import { ClearOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import type { EventSourceInput, EventClickArg } from "@fullcalendar/core";
import { Helmet } from "react-helmet";
import VenueModel from "../../../models/Venue.model";
import MeetingModel from "../../../models/Meeting.model";
import { useApi } from "../../../hooks";
import CourseModel from "../../../models/Course.model";
import SemesterModel from "../../../models/Semester.model";
import ProgramModel from "../../../models/Program.model";
import { renderEventContent } from "../../../components/Meeting/utils/renderEventContent";
import { EditMeetingModal, AddMeetingModal } from "../../../components";
import TimetableModel from "../../../models/Timetable.model";
import { print } from "../../../components/Meeting/utils/print";
import dayjs from "dayjs";

export const AdminMeetings = () => {
  const calendarRef = React.useRef<FullCalendar | null>(null);
  const [currentDate, setCurrentDate] = React.useState<Date | null>(null);
  const [currentMeeting, setCurrentMeeting] =
    React.useState<MeetingModel | null>(null);

  const [editMeetingModalOpened, setEditMeetingModalOpened] =
    React.useState(false);
  const [addMeetingModalOpened, setAddMeetingModalOpened] =
    React.useState(false);

  const [timetables] = useApi<TimetableModel[]>({
    endPoint: "/timetables",
  });

  const [meetings, fetchMeetings] = useApi<MeetingModel[]>({
    endPoint: "/meetings",
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const [courses] = useApi<CourseModel[]>({
    endPoint: "/courses",
  });

  const [venues] = useApi<VenueModel[]>({
    endPoint: "/venues",
  });

  const [semesters] = useApi<SemesterModel[]>({
    endPoint: "/semesters",
  });

  const [programs] = useApi<ProgramModel[]>({
    endPoint: "/programs",
  });

  const [selectedStartDate, setSelectedStartDate] = React.useState<
    Date | undefined
  >();
  const [selectedEndDate, setSelectedEndDate] = React.useState<
    Date | undefined
  >();

  const [courseId, setCourseId] = React.useState<number | undefined>(
    searchParams.get("courseId")
      ? Number(searchParams.get("courseId"))
      : undefined
  );
  const selectedCourse = React.useMemo(
    () => courses.value?.find((course) => course.id === courseId),
    [courses, courseId]
  );

  const [venueId, setVenueId] = React.useState<number | undefined>(
    searchParams.get("venueId")
      ? Number(searchParams.get("venueId"))
      : undefined
  );
  const selectedVenue = React.useMemo(
    () => venues.value?.find((venue) => venue.id === venueId),
    [venues, venueId]
  );

  const [semesterId, setSemesterId] = React.useState<number | undefined>(
    searchParams.get("semesterId")
      ? Number(searchParams.get("semesterId"))
      : undefined
  );
  const selectedSemester = React.useMemo(
    () => semesters.value?.find((semester) => semester.id === semesterId),
    [semesters, semesterId]
  );

  const [programId, setProgramId] = React.useState<number | undefined>(
    searchParams.get("programId")
      ? Number(searchParams.get("programId"))
      : undefined
  );
  const selectedProgram = React.useMemo(
    () => programs.value?.find((program) => program.id === programId),
    [programs, programId]
  );

  const [timetableId, setTimetableId] = React.useState<number | undefined>(
    searchParams.get("timetableId")
      ? Number(searchParams.get("timetableId"))
      : undefined
  );
  const selectedTimetable = React.useMemo(
    () => timetables.value?.find((timetable) => timetable.id === timetableId),
    [timetables, timetableId]
  );

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     if (calendarRef.current) {
  //       console.log(
  //         calendarRef.current
  //           ?.getApi()
  //           .view.calendar.gotoDate(new Date("2021-09-01"))
  //       );
  //     }
  //   }, 5000);
  // }, []);

  const events: EventSourceInput = [];

  const filteredMeetings = meetings.value?.filter((meeting) => {
    if (courseId && meeting.courseId !== Number(courseId)) {
      return false;
    }

    if (timetableId && meeting.timetableId !== Number(timetableId)) {
      return false;
    }

    if (venueId && meeting.venueId !== Number(venueId)) {
      return false;
    }

    if (semesterId && meeting.timetable?.semesterId !== Number(semesterId)) {
      return false;
    }

    if (programId && meeting.timetable?.programId !== Number(programId)) {
      return false;
    }

    return true;
  });

  filteredMeetings?.forEach((meeting) => {
    events.push({
      title: `${meeting.course?.name}`,
      date: meeting.date,
      allDay: true,
      extendedProps: {
        meeting,
      },
    });
  });

  const onEventClick = (arg: EventClickArg) => {
    const meeting = arg.event.extendedProps.meeting as MeetingModel;
    setCurrentMeeting(meeting);
    setCurrentDate(new Date(meeting.date));
    setEditMeetingModalOpened(true);
  };

  const onDateClick = (arg: DateClickArg) => {
    if (!selectedTimetable) {
      alert("Please select a timetable first");
    }

    // // if a holiday is selected, do not open the add meeting modal
    // console.log((arg.view as any).getCurrentData());

    setCurrentDate(new Date(arg.date));
    setAddMeetingModalOpened(true);
  };

  const onAddMeetingSuccess = () => {
    setCurrentDate(null);
    setAddMeetingModalOpened(false);
    fetchMeetings();
  };

  const onAddMeetingCancel = () => {
    setCurrentDate(null);
    setAddMeetingModalOpened(false);
  };

  const onEditMeetingSuccess = () => {
    setCurrentMeeting(null);
    setEditMeetingModalOpened(false);
    fetchMeetings();
  };

  const onEditMeetingCancel = () => {
    setCurrentMeeting(null);
    setEditMeetingModalOpened(false);
  };

  semesters.value?.forEach((semester) => {
    semester.holidays.forEach((holiday) => {
      events.push({
        title: holiday.name,
        start: dayjs(holiday.startDate).toDate(),
        end: dayjs(holiday.endDate).add(1, "day").toDate(),
        allDay: true,
        display: "background",
        color: "#ff0000",
        extendedProps: {
          holiday,
        },
      });
    });
  });

  let startDate = selectedStartDate;
  let endDate = selectedEndDate;

  if (selectedSemester && !selectedStartDate && !selectedEndDate) {
    startDate = selectedSemester.startDate;
    endDate = selectedSemester.endDate;
  }

  if (selectedTimetable && !selectedStartDate && !selectedEndDate) {
    startDate = selectedTimetable.semester?.startDate;
    endDate = selectedTimetable.semester?.endDate;
  }

  const onClickPrint = () => {
    print(events, {
      selectedCourse,
      selectedVenue,
      selectedSemester,
      selectedProgram,
      selectedTimetable,
      selectedStartDate: startDate,
      selectedEndDate: endDate,
    });
  };

  return (
    <div>
      <Helmet>
        <title>Meetings</title>
      </Helmet>
      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <Typography.Title level={3}>Meetings</Typography.Title>
        <Button type="primary" onClick={onClickPrint}>
          Print
        </Button>
      </Space>
      <Spin spinning={meetings.loading}>
        <div>
          <Space
            style={{
              display: "flex",
              marginBottom: 16,
            }}
            size="large"
            title="Filters"
            wrap
          >
            <Typography.Text
              style={{
                fontWeight: "bold",
              }}
            >
              Filters:
            </Typography.Text>
            <Select
              placeholder="select a course"
              allowClear
              value={courseId}
              onSelect={(value) => {
                setCourseId(Number(value));
                searchParams.set("courseId", value.toString());
                setSearchParams(searchParams);
              }}
              onClear={() => {
                setCourseId(undefined);
                searchParams.delete("courseId");
                setSearchParams(searchParams);
              }}
              loading={courses.loading}
            >
              {courses.value?.map((course) => (
                <Select.Option key={course.id} value={course.id as number}>
                  {course.name}
                </Select.Option>
              ))}
            </Select>
            <Select
              placeholder="select a venue"
              allowClear
              value={venueId}
              onSelect={(value) => {
                setVenueId(Number(value));
                searchParams.set("venueId", value.toString());
                setSearchParams(searchParams);
              }}
              onClear={() => {
                setVenueId(undefined);
                searchParams.delete("venueId");
                setSearchParams(searchParams);
              }}
              loading={venues.loading}
            >
              {venues.value?.map((venue) => (
                <Select.Option key={venue.id} value={venue.id}>
                  {venue.name}
                </Select.Option>
              ))}
            </Select>
            <Select
              placeholder="select a semester"
              allowClear
              value={semesterId}
              onSelect={(value) => {
                setSemesterId(Number(value));
                searchParams.set("semesterId", value.toString());
                setSearchParams(searchParams);
                setSelectedEndDate(undefined);
                setSelectedStartDate(undefined);
              }}
              onClear={() => {
                setSemesterId(undefined);
                searchParams.delete("semesterId");
                setSearchParams(searchParams);
              }}
              loading={semesters.loading}
            >
              {semesters.value?.map((semester) => (
                <Select.Option key={semester.id} value={semester.id}>
                  {semester.name}
                </Select.Option>
              ))}
            </Select>
            <Select
              placeholder="select a program"
              allowClear
              value={programId ? Number(programId) : undefined}
              onSelect={(value) => {
                setProgramId(Number(value));
                searchParams.set("programId", value.toString());
                setSearchParams(searchParams);
              }}
              onClear={() => {
                setProgramId(undefined);
                searchParams.delete("programId");
                setSearchParams(searchParams);
              }}
              loading={programs.loading}
            >
              {programs.value?.map((program) => (
                <Select.Option key={program.id} value={program.id}>
                  {program.name}
                </Select.Option>
              ))}
            </Select>
            <Select
              placeholder="select a timetable"
              allowClear
              value={timetableId ? Number(timetableId) : undefined}
              onSelect={(value) => {
                setTimetableId(Number(value));
                searchParams.set("timetableId", value.toString());
                setSearchParams(searchParams);
              }}
              onClear={() => {
                setTimetableId(undefined);
                searchParams.delete("timetable");
                setSearchParams(searchParams);
                setSelectedEndDate(undefined);
                setSelectedStartDate(undefined);
              }}
              loading={programs.loading}
            >
              {timetables.value?.map((timetable) => (
                <Select.Option key={timetable.id} value={timetable.id}>
                  {timetable.name}
                </Select.Option>
              ))}
            </Select>
            <DatePicker.RangePicker
              placeholder={["select start date", "select end date"]}
              value={
                startDate && endDate
                  ? [dayjs(startDate), dayjs(endDate)]
                  : undefined
              }
              onChange={(dates) => {
                if (dates === null) {
                  setSelectedStartDate(undefined);
                  setSelectedEndDate(undefined);
                } else {
                  setSelectedStartDate(dates?.[0]?.toDate() || undefined);
                  setSelectedEndDate(dates?.[1]?.toDate() || undefined);
                }
              }}
            />
            <Tooltip title="clear filters">
              <Button
                type="primary"
                onClick={() => {
                  searchParams.delete("courseId");
                  searchParams.delete("venueId");
                  searchParams.delete("semesterId");
                  searchParams.delete("programId");
                  searchParams.delete("timetableId");
                  setSearchParams(searchParams);
                  setCourseId(undefined);
                  setVenueId(undefined);
                  setSemesterId(undefined);
                  setProgramId(undefined);
                  setTimetableId(undefined);
                }}
                icon={<ClearOutlined />}
              />
            </Tooltip>
          </Space>
          {selectedTimetable && (
            <AddMeetingModal
              open={addMeetingModalOpened}
              date={currentDate}
              onCancel={onAddMeetingCancel}
              onSuccess={onAddMeetingSuccess}
              timetable={selectedTimetable}
            />
          )}
          {currentMeeting?.timetable && (
            <EditMeetingModal
              open={editMeetingModalOpened}
              date={currentDate}
              onCancel={onEditMeetingCancel}
              onSuccess={onEditMeetingSuccess}
              meeting={currentMeeting}
              timetable={currentMeeting.timetable}
            />
          )}
          {events.length > 0 ? (
            <FullCalendar
              selectable={false}
              plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              eventClick={onEventClick}
              headerToolbar={{
                left: "prevYear,prev,next,nextYear",
                center: "title",
                right: "today,dayGridDay,dayGridWeek,dayGridMonth",
              }}
              ref={calendarRef}
              events={events}
              eventContent={renderEventContent({ onDelete: fetchMeetings })}
              validRange={{
                start: startDate,
                end: endDate,
              }}
              dateClick={onDateClick}
            />
          ) : (
            <Empty description="No meetings found" />
          )}
        </div>
      </Spin>
    </div>
  );
};
