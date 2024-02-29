import React, { useEffect, useState } from "react";
import { Form, Button, Divider, ColorPicker, Space, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPADDColors,
  savePADDColors
} from "../store/reducer/settingsSlice";

const Colors = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const colors = useSelector((state) => state.settingsState.colors);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message,
      description
    });
  };

  // Save Colors
  const formSubmit = (values) => {
    let data = {};
    Object.entries(values).map((d, value) => {
      data = {
        ...data,
        [d?.[0]]: typeof d?.[1] === "object" ? `#${d?.[1]?.toHex()}` : d?.[1]
      };
    });

    setSaving(true);
    dispatch(
      savePADDColors(data, (colors) => {
        setSaving(false);
        openNotificationWithIcon(
          "success",
          "Success!",
          "Successfully saved colors."
        );
      })
    );
  };

  const resetColors = () => {
    form.setFieldsValue({
      padd_1a: "#328e42",
      padd_1b: "#45b255",
      padd_1c: "#7ccb29",
      padd_2: "#5ca5bf",
      padd_3: "#162f3f",
      padd_4: "#8bc4d2",
      padd_5: "#265997"
    });
  };

  // Fetch colors
  useEffect(() => {
    setLoading(true);
    dispatch(
      fetchPADDColors((colors) => {
        setLoading(false);
      })
    );
  }, []);

  // Set colors value after fetch
  useEffect(() => {
    form.setFieldsValue(colors);
  }, [colors]);

  if (loading) return <h4>Please wait...</h4>;
  else
    return (
      <>
        {contextHolder}
        <Divider orientation="left" orientationMargin="0">
          USA PADD Colors
        </Divider>
        <Form form={form} layout="vertical" onFinish={(e) => formSubmit(e)}>
          <Form.Item name="padd_1a">
            <ColorPicker
              format="hex"
              showText={(color) => <span>PADD 1A ({color.toHexString()})</span>}
            />
          </Form.Item>
          <Form.Item name="padd_1b">
            <ColorPicker
              format="hex"
              showText={(color) => <span>PADD 1B ({color.toHexString()})</span>}
            />
          </Form.Item>
          <Form.Item name="padd_1c">
            <ColorPicker
              format="hex"
              showText={(color) => <span>PADD 1C ({color.toHexString()})</span>}
            />
          </Form.Item>
          <Form.Item name="padd_2">
            <ColorPicker
              format="hex"
              showText={(color) => <span>PADD 2 ({color.toHexString()})</span>}
            />
          </Form.Item>
          <Form.Item name="padd_3">
            <ColorPicker
              format="hex"
              showText={(color) => <span>PADD 3 ({color.toHexString()})</span>}
            />
          </Form.Item>
          <Form.Item name="padd_4">
            <ColorPicker
              format="hex"
              showText={(color) => <span>PADD 4 ({color.toHexString()})</span>}
            />
          </Form.Item>
          <Form.Item name="padd_5">
            <ColorPicker
              format="hex"
              showText={(color) => <span>PADD 5 ({color.toHexString()})</span>}
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={saving}>
                Save Colors
              </Button>
              <Button onClick={resetColors}>Reset Colors</Button>
            </Space>
          </Form.Item>
        </Form>
      </>
    );
};

export default Colors;
