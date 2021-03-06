import React from "react";
import styles from "./index.module.less";
import {Icon, Modal} from "antd";
import {withRouter} from "react-router-dom";
import Button from "../../../../../components/Button";
import CheckBox from "../../../../../components/CheckBox";
import {getAllCoupons} from "../../../../../services/apiCoupon";
import {getMemberInfo} from "../../../../../services/apiMember";
import {payingWithMember, payingWithOthers} from "../../../../../services/apiOrders";

const coupons = [
    {
        couponId: 1,
        moviesIncluded: [1, 2, 3],
        couponName: '品质联盟1',
        couponDescription: '春节电影节优惠券',
        couponPictureUrl: 'pic',
        couponDiscount: 30,
        couponThreshold: 0, //使用门槛
        couponStartTime: '2019-06-01',
        couponEndTime: '2019-06-30',
        couponExpiration: '10天', //有效期长度
    },
    {
        couponId: 2,
        moviesIncluded: [],
        couponName: '品质联盟2',
        couponDescription: '春节电影节优惠券',
        couponPictureUrl: 'pic',
        couponDiscount: 1000,
        couponThreshold: 0, //使用门槛
        couponStartTime: '2019-06-01',
        couponEndTime: '2019-06-30',
        couponExpiration: '10天', //有效期长度
    },
    {
        couponId: 2,
        moviesIncluded: [1, 2, 3],
        couponName: '品质联盟2',
        couponDescription: '春节电影节优惠券',
        couponPictureUrl: 'pic',
        couponDiscount: 1000,
        couponThreshold: 0, //使用门槛
        couponStartTime: '2019-06-01',
        couponEndTime: '2019-06-30',
        couponExpiration: '10天', //有效期长度
    },
    {
        couponId: 2,
        moviesIncluded: [1, 2, 3],
        couponName: '品质联盟2',
        couponDescription: '春节电影节优惠券',
        couponPictureUrl: 'pic',
        couponDiscount: 1000,
        couponThreshold: 0, //使用门槛
        couponStartTime: '2019-06-01',
        couponEndTime: '2019-06-30',
        couponExpiration: '10天', //有效期长度
    },
    {
        couponId: 2,
        moviesIncluded: [1, 2, 3],
        couponName: '品质联盟2',
        couponDescription: '春节电影节优惠券',
        couponPictureUrl: 'pic',
        couponDiscount: 1000,
        couponThreshold: 0, //使用门槛
        couponStartTime: '2019-06-01',
        couponEndTime: '2019-06-30',
        couponExpiration: '10天', //有效期长度
    }, {
        couponId: 2,
        moviesIncluded: [1, 2, 3],
        couponName: '品质联盟2',
        couponDescription: '春节电影节优惠券',
        couponPictureUrl: 'pic',
        couponDiscount: 1000,
        couponThreshold: 0, //使用门槛
        couponStartTime: '2019-06-01',
        couponEndTime: '2019-06-30',
        couponExpiration: '10天', //有效期长度
    },
    {
        couponId: 2,
        moviesIncluded: [1, 2, 3],
        couponName: '品质联盟2',
        couponDescription: '春节电影节优惠券',
        couponPictureUrl: 'pic',
        couponDiscount: 1000,
        couponThreshold: 0, //使用门槛
        couponStartTime: '2019-06-01',
        couponEndTime: '2019-06-30',
        couponExpiration: '10天', //有效期长度
    }, {
        couponId: 2,
        moviesIncluded: [1, 2, 3],
        couponName: '品质联盟2',
        couponDescription: '春节电影节优惠券',
        couponPictureUrl: 'pic',
        couponDiscount: 1000,
        couponThreshold: 0, //使用门槛
        couponStartTime: '2019-06-01',
        couponEndTime: '2019-06-30',
        couponExpiration: '10天', //有效期长度
    }
];

const memberInfo = {
    memberId: 1,
    memberStrategyName: '最强王者', // 约等于会员卡等级
    memberPictureurl: '',
    memberCredit: 10,
    memberDiscount: 100
};

class BuyModal extends React.Component {
    state = {
        totalCost: 0,
        coupons: [],
        isPaying: false,
        memberPaying: false,
        memberInfo: [],
        order: {}
    };

    componentWillMount() {
        const {order} = this.props;
        getAllCoupons().then((coupons) => {
            this.setState({
                coupons: coupons.filter((coupon) => {
                    return coupon.couponThreshold <= order.cost
                }),
                order,
                selectedCouponIndexes: [],
                totalCost: order.cost
            });
        });
    };

    handleOk = () => {
        getMemberInfo().then(res => {
                console.log(res);
                this.setState({
                    isPaying: true,
                    memberPaying: true,
                    memberInfo: res
                })
            }
        ).catch(err => {
            console.log(err);
            this.setState({
                isPaying: true,
                memberPaying: false,
                memberInfo: []
            })
        });


        // this.setState({
        //     isPaying: true,
        //     memberPaying: true,
        //     memberInfo: memberInfo
        // });
    };

    handleCancel = () => {
        this.setState({
            isPaying: false
        });
        this.props.onCancel();
    };

    handleCouponSelection = (value) => {
        this.setState((prevState) => {
            return (prevState.selectedCouponIndexes
                    .filter(item => item.toString() !== value.toString())
                    .length
                !== prevState.selectedCouponIndexes.length)
                ? {selectedCouponIndexes: prevState.selectedCouponIndexes.filter(item => item.toString() !== value.toString())}
                : {selectedCouponIndexes: [value, ...prevState.selectedCouponIndexes]}
        });
        this.setState((prevState) => {
            return {totalCost: prevState.order.cost - prevState.selectedCouponIndexes.reduce((total, index) => total + prevState.coupons[index].couponDiscount, 0)}
        })
    };

    handleConfirmPaying = (totalCost) => {
        const {selectedCouponIndexes, memberPaying} = this.state;
        let coupons = selectedCouponIndexes.map((item) => ({couponId: this.state.coupons[item].couponId}));
        if (memberPaying) {
            payingWithMember({memberId: this.state.memberInfo.memberId, orderId: this.state.order.orderId, coupons})
                .then((res) => {
                    alert("完成支付 ¥" + totalCost);
                    this.props.history.go();
                    //this.props.history.push("/home/order");
                })
        } else {
            payingWithOthers({orderId: this.state.order.orderId, coupons})
                .then((res) => {
                    alert("完成支付 ¥" + totalCost);
                    this.props.history.go();
                });
            alert("完成支付 ¥" + totalCost);
        }
    };

    render() {
        const {modalVisible, order} = this.props;
        const {coupons, isPaying, memberPaying, memberInfo, totalCost} = this.state;
        return (
            <Modal
                title="购票"
                visible={modalVisible}
                onCancel={this.handleCancel}
                footer={null}
            >{
                isPaying
                    ? (
                        <div className={styles.whole}>
                            {memberPaying
                                ? (
                                    <div className={styles.member}>
                                        <div className={styles.header}>
                                            <p style={{color: "#FFEB9E", cursor: "pointer"}}> 会员卡支付 </p>
                                            <p style={{color: "#C0C0C0", cursor: "pointer"}}
                                               onClick={() => this.setState({memberPaying: false})}> 第三方支付 </p>
                                        </div>
                                        {memberInfo.length === 0
                                            ? <div className={styles['not-member']}>
                                                <p className={styles.text}>您还不是会员</p>
                                                <p className={styles.text}
                                                   style={{fontSize: 18, cursor: "pointer"}}
                                                   onClick={() => this.props.history.push("/home/membercenter")}>点击这里加入会员</p>
                                            </div>
                                            : <div className={styles['is-member']}>
                                                <p className={styles.text}>会员卡余额：{memberInfo.memberCredit}</p>
                                                <p className={styles.text}>总价：{totalCost}</p>
                                                {memberInfo.memberCredit < totalCost
                                                    ? <p className={styles.text}
                                                         style={{fontSize: 18, cursor: "pointer"}}
                                                         onClick={() => this.props.history.push("/home/membercenter")}>余额不足，立即充值</p>
                                                    : <div>
                                                        <p className={styles.text}>会员卡折扣: {memberInfo.memberDiscount * 10}折</p>
                                                        <div className={styles.pay}>
                                                            <p className={styles.text}>折后需支付:
                                                                ¥{totalCost * memberInfo.memberDiscount}</p>
                                                        </div>
                                                        <div>
                                                            <Button type="yellow"
                                                                    onClick={() => this.handleConfirmPaying(totalCost * memberInfo.memberDiscount)}>立即支付</Button>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                ) : (
                                    <div className={styles.other}>
                                        <div className={styles.header}>
                                            <p style={{color: "#C0C0C0", cursor: "pointer"}}
                                               onClick={() => this.setState({memberPaying: true})}>会员卡支付</p>
                                            <p style={{color: "#FFEB9E", cursor: "pointer"}}> 第三方支付 </p>
                                        </div>
                                        <Icon type="alipay-circle" style={{color: "#FFEB9E", fontSize: 50}}/>
                                        <div className={styles['container']}>
                                            <img
                                                src={"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4111326472,3830612202&fm=26&gp=0.jpg"}/>
                                        </div>
                                        <p className={styles.text}>总价：{totalCost}</p>
                                        <Button type="yellow"
                                                onClick={() => this.handleConfirmPaying(totalCost)}>完成支付</Button>
                                    </div>

                                )}
                        </div>
                    ) : (
                        <div className={styles.whole}>
                            <div className={styles.movieInfo}>
                                <div className={styles['image-container']}>
                                    <img className={styles.image} src={order.moviePosterUrl} alt=''/>
                                </div>
                                <div className={styles['details-container']}>
                                    <div className={styles.name}>{order.movieName}</div>
                                    <div className={styles.text}>{order.hallName}</div>
                                    <div
                                        className={styles.text}>{`${order.interval.startTime} - ${order.interval.endTime}`}</div>
                                    {order.selectedSeats.map((seats) => {
                                        return (
                                            <div key={seats.row + "_" + seats.column + "_" + order.orderId}
                                                 className={styles.text}>
                                                {`${seats.row + 1}排 ${seats.column + 1}座`}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <p className={styles.text} style={{marginTop: 30, fontSize: 18}}>可用优惠券</p>
                            <div className={styles.coupons}>
                                {coupons.map((coupon, index) => {
                                    return (
                                        <div className={styles.coupon} key={"" + coupon.couponId}>
                                            <div className={`${styles['coupon-info']} ${styles.text}`}>
                                                <p style={{color: "white"}}>{coupon.couponName}</p>
                                                <div style={{display: "flex", alignItems: "center"}}>
                                                    <Icon type="clock-circle"/>
                                                    <p style={{marginLeft: 10}}>有效期:{coupon.couponExpiration}</p>
                                                </div>
                                            </div>
                                            <CheckBox value={index} onSelected={this.handleCouponSelection}/>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={styles.cost}>
                                <p className={styles.text}
                                   style={{
                                       fontSize: 23,
                                       marginTop: 10
                                   }}>¥ {totalCost}</p>
                            </div>
                            <div className={styles.buttons}>
                                <Button type='gray' onClick={this.handleCancel}>Cancel</Button>
                                <Button type='yellow' onClick={this.handleOk}>OK</Button>
                            </div>
                        </div>
                    )}
            </Modal>
        );
    }
}

export default withRouter(BuyModal);
