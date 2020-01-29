import { Form, Icon, Input, Button, Checkbox } from "antd";

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

ReactDOM.render(<WrappedNormalLoginForm />, mountNode);

// ///////////////////////////////////////////////////////////////////


<Form.Item
validateStatus={sir_nameError ? "error" : ""}
help={sir_nameError || ""}
>
{getFieldDecorator("sir_name", {
  rules: [{ required: true, message: "Please input your sir_name!" }]
})(
  <Input
    prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
    type="text"
    placeholder=" Student's first name"
    name="sir_name"
    onChange={this.onChange}
    value={sir_name}
  />
)}
</Form.Item>

<Form.Item
validateStatus={passwordError ? "error" : ""}
help={passwordError || ""}
>
{getFieldDecorator("password", {
  rules: [{ required: true, message: "Please input your Password!" }]
})(
  <Input
    prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
    type="password"
    placeholder="Password"
  />
)}
</Form.Item>