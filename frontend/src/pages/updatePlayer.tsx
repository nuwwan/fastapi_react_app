import { Button, Form, Input, InputNumber, Modal } from "antd"
import { TPlayer } from "../types"
import { useEffect } from "react"

type PropType = {
    name: string
    points:number
    onSubmit: (name:string,points:number) => void
    isOpen: boolean
    closePopup: () => void
}
const UpdatePlayerModal: React.FC<PropType> = (props) => {
    const [updateForm] = Form.useForm();
    
    const handleSubmit = (values: any) => {
        console.log("Submitted values:", values);
        props.onSubmit(values?.name,values.points )
        props.closePopup(); // Close modal after submission
        updateForm.resetFields(); // Reset form fields after submission
    }

    useEffect(()=>{console.log(props)})

    const handleFailedSubmission = (errorInfo: any) => {
        console.error("Validation Failed:", errorInfo);
    };

    return (
        <Modal title="Update Player" open={props.isOpen} onOk={handleSubmit} onCancel={() => props.closePopup()} footer={null}>
            <Form
                form={updateForm}
                layout="vertical"
                name="popupForm"
                onFinish={handleSubmit}
                onFinishFailed={handleFailedSubmission}
                autoComplete="off"
                initialValues={{name:props.name,points:props.points}}
            >
                {/* Name Field */}
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Please input your name!" }]}
                >
                    <Input placeholder="Enter your name" />
                </Form.Item>

                {/* Points Field */}
                <Form.Item
                    label="Points"
                    name="points"
                    rules={[
                        { required: true, message: "Please input your points!" },
                        { type: "number", min: 0, message: "Points must be a non-negative number!" },
                    ]}
                >
                    <InputNumber style={{ width: "100%" }} placeholder="Enter points" />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default UpdatePlayerModal