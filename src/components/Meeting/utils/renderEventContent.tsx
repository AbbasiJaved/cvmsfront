import { EventContentArg } from "@fullcalendar/core";
import { Popover, Space } from "antd";
import HolidayModel from "../../../models/Holiday.model";
import MeetingModel from "../../../models/Meeting.model";
import { DeleteButton } from "../../DeleteButton";

export const renderEventContent =
  ({ onDelete }: { onDelete?: () => void }) =>
  (arg: EventContentArg) => {
    const meeting = arg.event.extendedProps.meeting as MeetingModel;
    const holiday = arg.event.extendedProps.holiday as HolidayModel;

    if (meeting) {
      return (
        <Popover
          trigger={"hover"}
          title="Meeting Details"
          content={
            <Space direction="vertical">
              <span>
                <b>Time:</b> (9:00am : 5:00pm)
              </span>
              <span>
                <b>Location:</b> {meeting.venue?.location}
              </span>
              <span>
                <b>Mode:</b> {meeting.online ? "online" : "on-site"}
              </span>
              <span>
                <b>Venue:</b> {meeting.venue?.name}
              </span>
              <span>
                <b>Course:</b> {meeting.course?.name} - {meeting.course?.code}
              </span>
              <span>
                <b>Lecturer:</b> Dr. {meeting.course?.lecturer?.firstName}{" "}
                {meeting.course?.lecturer?.lastName}
              </span>
              {onDelete && (
                <DeleteButton
                  id={meeting.id}
                  resource="meetings"
                  onSuccess={onDelete}
                />
              )}
            </Space>
          }
        >
          <Space direction="vertical">
            <span>{meeting.course?.name}</span>
            <span>
              {meeting.venue?.location} {meeting.venue?.name}
            </span>
          </Space>
        </Popover>
      );
    } else if (holiday) {
      return (
        <Popover
          trigger={"hover"}
          title={holiday.name}
          content={
            <Space direction="vertical">
              <span>type: {holiday.type}</span>
              <span>{holiday.name}</span>
            </Space>
          }
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: "white",
            }}
          >
            {holiday.name}
          </div>
        </Popover>
      );
    }
  };
