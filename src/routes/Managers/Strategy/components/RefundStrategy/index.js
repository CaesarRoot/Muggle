import React, {Component} from 'react'
import {Descriptions, Input, Modal} from "antd";
import {changeRefundStrategy, getRefundStrategy} from "../../../../../services/apiStrategy";
import styles from './index.module.less'
import Button from "../../../../../components/Button";

const testRefundInfo = {
    latestRefundTimeBeforePaying: 5, //距离开场的时间，单位小时
    refundRate: 0.9
};

class RefundStrategy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latestRefundTimeBeforePlaying: 0,
            refundRate: 0,
            changeRefundVisible: false
        }
    }

    componentWillMount() {
        getRefundStrategy().then(res => {
                const refundInfo = res;
                console.log(res);
                this.setState({
                    latestRefundTimeBeforePlaying: refundInfo.latestRefundTimeBeforePaying,
                    refundRate: refundInfo.refundRate
                });
            }
        );

        // this.setState({
        //     latestRefundTimeBeforePlaying: testRefundInfo.latestRefundTimeBeforePlaying,
        //     refundRate: testRefundInfo.refundRate
        // })
    }

    closeModal() {
        this.setState({
            changeRefundVisible: false
        })
    }


    handleChangeClick = () => {
        this.setState({
            changeRefundVisible: true
        })
    };


    handleRateChange = (e) => {
        this.setState({
            refundRate: e.target.value
        })
    };
    handleTimeChange = (e) => {
        this.setState({
            latestRefundTimeBeforePlaying: e.target.value
        })
    };

    handleChangeSubmit = () => {
        let refundInfo = this.state;
        delete refundInfo.changeRefundVisible;
        console.log(refundInfo);
        changeRefundStrategy(refundInfo).then(() => {
            alert('修改成功');
            this.closeModal();
        })
        //this.closeModal();
    };

    render() {
        const desTitle = (
                <div className={styles.title}>
                    退票策略
                    <div className={styles.button}>
                        <Button type={'gray'} onClick={this.handleChangeClick}>修改</Button>
                    </div>
                </div>
            )
        ;

        const {latestRefundTimeBeforePlaying, refundRate, changeRefundVisible} = this.state;
        return (
            <div className={styles.refundDes}>
                <div className={styles.inner}>
                    <Descriptions title={desTitle}>
                        <Descriptions.Item className={styles.refundItem}
                                           label="开场前可退票时间">{latestRefundTimeBeforePlaying} 小时</Descriptions.Item>
                        <Descriptions.Item className={styles.refundItem}
                                           label="退票可返还金额百分比">{refundRate * 100} %</Descriptions.Item>
                    </Descriptions>
                    <Modal title={'修改退票策略'} visible={changeRefundVisible} footer={null}
                           onCancel={this.closeModal.bind(this)}>
                        <div className={styles.wrapper}>
                            <div className={styles.text}>
                                <div className={styles.hint}>开场前可退票时间</div>
                                <Input className={styles.input} onChange={this.handleTimeChange.bind(this)}
                                       value={latestRefundTimeBeforePlaying} suffix={'小时'}/>
                            </div>
                            <div className={styles.text}>
                                <div className={styles.hint}>退票可返还金额百分比</div>
                                <Input className={styles.input} onChange={this.handleRateChange.bind(this)}
                                       value={refundRate}/>
                            </div>
                            <div className={styles.footer}>
                                <Button type={'yellow'} onClick={this.handleChangeSubmit.bind(this)}>提交修改</Button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default RefundStrategy
