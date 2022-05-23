import { Form, Input, Button, Checkbox } from "antd";
import axios from "axios";
import styles from "./RegisterForm.module.css";
import { useNavigate } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const RegisterForm = () => {
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    try {
        // 参数1: url，参数2: 对象
        await axios.post("http://123.56.149.216:8080/auth/register", {
            email: values.username,
            password: values.password,
            confirmPassword: values.confirm
        })
        navigate("/signIn")
    } catch(error) {
        alert("注册失败！")
    }   
    
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish} // 提交表单且数据验证成功后回调事件
      onFinishFailed={onFinishFailed} // 提交表单且数据验证失败后回调事件
      className={styles["register-form"]}
    >
      <Form.Item
        label="Username"
        name="username"
        // rules是一个列表，里面使用约束对象来限制输入的内容
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      {/* 密码校验 */}
      <Form.Item
        label="Confirm Password"
        name="confirm"
        hasFeedback // 对校验密码是否一致做出UI反馈
        rules={[
          { required: true, message: "Please input your confirm password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("密码确认不一致！");
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
