import {PureComponent} from "react";
import React from "react";
import styles from "./index.module.less";
import WithSider from "../../../components/WithSider";
import SeatsPicker from "../../../components/SeatsPicker";
import AddNew from "../../../components/AddNew";
import Input from "antd/es/input";
import {Col, Form, Row} from "antd";
import Button from "../../../components/Button";
import SeatTaken from "../../../components/SeatsPicker/SeatTaken";
import {addHall, getAllHalls} from "../../../services/apiHalls";
import HallCard from "./HallCard";

let halls = [{
    hallName: 'xxx',
    seats: [[1, 1, 1]]//0代表不可用，1代表可用
}, {
    hallName: 'xxx',
    seats: [[1, 1, 1]]//0代表不可用，1代表可用
}, {
    hallName: 'xxx',
    seats: [[1, 1, 1]]//0代表不可用，1代表可用
}, {
    hallName: 'xxx',
    seats: [[1, 1, 1]]//0代表不可用，1代表可用
}, {
    hallName: 'xxx',
    seats: [[1, 1, 1]]//0代表不可用，1代表可用
}];

class Halls extends PureComponent {
    state = {
        halls: [],
        addVisible: "",
        seats: [[]],
        hallName: "",
        buttonVisible: false
    };

    componentWillMount() {
        getAllHalls().then((halls) => {
            this.setState({
                halls
            })
        });
        // this.setState({
        //   halls
        // })
    }

    handleAddClick = () => {
        this.setState({
            addVisible: "none"
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                let seats = new Array(parseInt(values.row));   //表格有10行
                for (let i = 0; i < seats.length; i++) {
                    seats[i] = new Array(parseInt(values.column)).fill(1);    //每行有10列
                }
                console.log(seats);
                this.setState({
                    seats: seats,
                    hallName: values.hallName,
                    buttonVisible: true
                })
            }
        })
    };

    handleConfirmAdd = () => {
        let hall = {hallName: this.state.hallName, seats: this.state.seats};
        console.log(hall);
        addHall(hall).then(res => {
            alert('新增影厅成功！');
            setTimeout(window.location.href = "/manage/halls", 3000);
        }).catch(res => {
            alert('添加失败！')
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const {halls} = this.state;
        return (
            <div className={styles.whole}>
                <div style={{display: this.state.addVisible, width: "100%"}}>

                    {halls.map((hall) =>
                        <div>
                            <HallCard seats={hall.seats} hallName={hall.hallName} hallId={hall.hallId}/>
                            <div className={styles.underline}/>
                        </div>
                    )}
                    <div className={styles.new} onClick={this.handleAddClick}>
                        <AddNew/>
                    </div>
                </div>
                <div className={styles.text} style={{display: this.state.addVisible === "" ? "none" : ""}}>
                    <Form onSubmit={this.handleSubmit}>
                        <Row gutter={36}>
                            <Col span={6}>
                                <Form.Item label={'行数'}>
                                    {getFieldDecorator('row')(
                                        <Input placeholder={'row'}/>)}
                                </Form.Item>
                            </Col>
                            <Col span={6} >
                                <Form.Item label={'列数'}>
                                    {getFieldDecorator('column')(
                                        <Input placeholder={'column'}/>)}
                                </Form.Item>
                            </Col>
                            <Col span={6} >
                                <Form.Item label={'影厅名'}>
                                    {getFieldDecorator('hallName')(
                                        <Input placeholder={'hallName'}/>)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Col span={6} offset={6}>
                            <Form.Item>
                                <Button type="yellow" htmlType='submit'>确认</Button>
                            </Form.Item>
                        </Col>
                    </Form>
                </div>
                <div className={styles.seats}>
                    {this.state.seats.map((row, rowIndex) => {
                        return (
                            <div className={styles.row}>
                                {row.map((column, columnIndex) => {
                                    return (
                                        <SeatTaken/>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                {this.state.buttonVisible ? <Button type="yellow" onClick={this.handleConfirmAdd}>确认添加</Button> : ""}
            </div>
        )
    };
}

export default Form.create()(WithSider(Halls));
