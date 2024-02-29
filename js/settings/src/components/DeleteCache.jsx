import { useState } from "react";
import { Divider, Button, notification } from "antd";
import { useDispatch } from "react-redux";
import { cacheCleanup } from "../store/reducer/settingsSlice";

const DeleteCache = () => {
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState(false);
  const onClick = () => {
    setDeleting(true);
    dispatch(
      cacheCleanup((status) => {
        setDeleting(false);
        if (status == "success") {
          openNotificationWithIcon(
            "success",
            "Success!",
            "Successfully deleted cache."
          );
        } else {
          openNotificationWithIcon(
            "error",
            "Error!",
            "Unable to delete cache."
          );
        }
      })
    );
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message,
      description
    });
  };
  return (
    <>
      {contextHolder}
      <Divider orientation="left" orientationMargin="0">
        Data Cache
      </Divider>
      <ul>
        <li>
          This cache mechanism is added to avoid expensive request operation
          that will cause slow loading time specially that we are fetching 2
          years of data.
        </li>
        <li>Every shortcode has its own cache.</li>
        <li>
          Data is stored in a json file and is located under{" "}
          <code>wp-content/uploads/usa-gas-prices</code>.
        </li>
        <li>
          A cron is running on the background that will trigger twice a day to
          cleanup the cache.
        </li>
        <li>
          Incase of inaccurate data, use the button below to cleanup the cache
          immediately.
        </li>
      </ul>
      <Button type="primary" danger onClick={onClick} loading={deleting}>
        Delete Cache
      </Button>
    </>
  );
};

export default DeleteCache;
