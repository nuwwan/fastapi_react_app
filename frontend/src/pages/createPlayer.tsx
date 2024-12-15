import { Button, Form, Input, InputNumber, Modal } from "antd"
import { useState } from "react"
import { TPlayer } from "../types"

type PropType = {
    onSubmit: (player: TPlayer) => void;
}

const CreatePlayer: React.FC<PropType> = (props) => {
    const [isModalopen, setIsModalOpen] = useState<boolean>(false)
    const [addPlayerForm] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        addPlayerForm.resetFields(); // Reset form fields when the modal is closed
    };

    const handleSubmit = (values: any) => {
        console.log("Submitted values:", values);
        props.onSubmit({ name: values?.name, points: values.points })
        setIsModalOpen(false); // Close modal after submission
        addPlayerForm.resetFields(); // Reset form fields after submission
    };

    const handleFailedSubmission = (errorInfo: any) => {
        console.error("Validation Failed:", errorInfo);
    };

    return (
        <div>
            <Modal title="Add Player" open={isModalopen} onOk={handleSubmit} onCancel={handleCancel} footer={null}>
                <Form
                    form={addPlayerForm}
                    layout="vertical"
                    name="popupForm"
                    onFinish={handleSubmit}
                    onFinishFailed={handleFailedSubmission}
                    autoComplete="off"
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
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button style={{margin:10}} onClick={showModal}>Add Player</Button>
            </div>
        </div>)
}

export default CreatePlayer