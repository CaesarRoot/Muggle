import {PureComponent} from "react";
import React from "react";
import styles from "./index.module.less";
import WithHeaderFooterSider from "../../../../components/WithHeaderFooterSider";
import {Popconfirm, Table} from "antd";
import Button from "../../../../components/Button";
import Tag from "./Tag";
import AlreadyBuyModal from "./AlreadyBuyModal";
import BuyModal from "./BuyModal";
import {cancelOrder, getAllTicketOrders, returnTicket} from "../../../../services/apiOrders";

const orders = [
    {
        orderId: 1,
        movieName: "spider man",
        moviePosterUrl: "https://s2.ax1x.com/2019/05/31/VQrg6s.png",
        hallName: '1号厅',
        date: '2019-1-1',
        interval: {
            startTime: '1:00',
            endTime: '1:01'
        },
        status: 1, //0: 未完成 1: 已完成 2: 已失效
        cost: 1,
        ticketCode: '111', //取票码
        selectedSeats: [{
            row: 1,
            column: 1
        }],
        ticketNum: 1,
        initTime: '' //生成订单时间
    }, {
        orderId: 2,
        movieName: "spider man",
        moviePosterUrl: "https://s2.ax1x.com/2019/05/31/VQrg6s.png",
        hallName: '2号厅',
        date: '2019-1-2',
        interval: {
            startTime: '1:00',
            endTime: '1:01'
        },
        status: 0, //0: 未完成 1: 已完成 2: 已失效
        cost: 1,
        ticketCode: '222', //取票码
        selectedSeats: [{
            row: 1,
            column: 1
        }, {
            row: 1,
            column: 2
        }],
        ticketNum: 1,
        initTime: '' //生成订单时间
    }, {
        orderId: 3,
        movieName: "spider man",
        moviePosterUrl: "https://s2.ax1x.com/2019/05/31/VQrg6s.png",
        hallName: '2号厅',
        date: '2019-1-4',
        interval: {
            startTime: '1:00',
            endTime: '1:01'
        },
        status: 2, //0: 未完成 1: 已完成 2: 已失效
        cost: 1,
        ticketCode: '333', //取票码
        selectedSeats: [{
            row: 1,
            column: 1
        }, {
            row: 1,
            column: 2
        }],
        ticketNum: 1,
        initTime: '' //生成订单时间
    }, {
        orderId: 4,
        movieName: "spider man",
        moviePosterUrl: "https://s2.ax1x.com/2019/05/31/VQrg6s.png",
        hallName: '2号厅',
        date: '2019-1-3',
        interval: {
            startTime: '1:00',
            endTime: '1:01'
        },
        status: 3, //0: 未完成 可取消 1: 已完成 可退票 2: 已失效 3：已完成 不可退票
        cost: 1,
        ticketCode: '444', //取票码
        selectedSeats: [{
            row: 1,
            column: 1
        }, {
            row: 1,
            column: 2
        }],
        ticketNum: 1,
        initTime: '' //生成订单时间
    }, {
        orderId: 5,
        movieName: "spider man",
        moviePosterUrl: "https://s2.ax1x.com/2019/05/31/VQrg6s.png",
        hallName: '2号厅',
        date: '2019-1-9',
        interval: {
            startTime: '1:00',
            endTime: '1:01'
        },
        status: 1, //0: 未完成 1: 已完成 2: 已失效
        cost: 1,
        ticketCode: '555', //取票码
        selectedSeats: [{
            row: 1,
            column: 1
        }, {
            row: 1,
            column: 2
        }],
        ticketNum: 1,
        initTime: '' //生成订单时间
    }, {
        orderId: 6,
        movieName: "spider man",
        moviePosterUrl: "https://s2.ax1x.com/2019/05/31/VQrg6s.png",
        hallName: '2号厅',
        date: '2019-1-6',
        interval: {
            startTime: '1:00',
            endTime: '1:01'
        },
        status: 0,
        cost: 1,
        ticketCode: '666', //取票码
        selectedSeats: [{
            row: 1,
            column: 1
        }, {
            row: 1,
            column: 2
        }],
        ticketNum: 1,
        initTime: '' //生成订单时间
    }
];

class Order extends PureComponent {
    columns = [
        {
            title: '电影',
            align: 'center',
            width: 200,
            render: (text, record) => {
                return (
                    <div className={styles.movieInfo}>
                        <div className={styles.container}>
                            <img src={record.moviePosterUrl}/>
                        </div>
                        <p>{record.movieName}</p>
                    </div>
                )
            }
        },
        {
            title: '座位',
            align: 'center',
            render: (text, record) => {
                return (
                    <div className={styles.seats}>
                        <div className={styles.text}>
                            <p style={{fontWeight: "bold", fontSize: 16}}>{record.hallName}</p>
                            {record.selectedSeats.map((item) => {
                                return <div>{`${item.row + 1} 排 ${item.column + 1} 座`}</div>
                            })}
                        </div>
                    </div>
                )
            },
        },
        {
            title: '日期',
            align: 'center',
            render: (text, record) => {
                return (
                    <div className={styles.date}>
                        <div className={styles.text}>
                            {record.date}
                        </div>
                    </div>
                )
            },
            defaultSortOrder: 'ascend',
            sorter: (a, b) => new Date(b.date) - new Date(a.date)
        }, {
            title: '时间',
            align: 'center',
            render: (text, record) => {
                return (
                    <div className={styles.time}>
                        <div className={styles.text}>
                            {`${record.interval.startTime} - ${record.interval.endTime}`}
                        </div>
                    </div>
                )
            }
        }, {
            title: '票价',
            align: 'center',
            render: (text, record) => {
                return (
                    <div className={styles.cost}>
                        <div className={styles.text}>
                            {"¥" + record.cost}
                        </div>
                    </div>
                )
            }
        }, {
            title: '状态',
            align: 'center',
            render: (text, record) => {
                return (
                    <div className={styles.cost}>
                        <div className={styles.text}>
                            {record.status === 2 &&
                            <div>
                                <Button type="yellow"
                                        onClick={() => this.handleBuyClick(record.orderId, record.cost)}>立即支付</Button>

                                <Popconfirm title='确认取消订单？'
                                            onConfirm={() => this.handleCancelOrderClick(record.orderId)}
                                            okText="Yes"
                                            cancelText="No">
                                    <p style={{marginTop: 10, cursor: "pointer"}}>取消订单</p>
                                </Popconfirm>

                            </div>
                            }
                            {record.status === 1 &&
                            <div>
                                <Tag type="lime" onClick={() => this.handleLookClick(record.ticketCode)}>
                                    查看取票码
                                </Tag>
                                <Popconfirm title='确认退票？'
                                            onConfirm={() => this.handleReturnTicketClick(record.orderId)}
                                            okText="Yes"
                                            cancelText="No">
                                    <p style={{marginTop: 10, cursor: "pointer"}}>退票</p></Popconfirm>

                            </div>
                            }
                            {record.status === 3 &&
                            <Tag type="grey">
                                已失效
                            </Tag>}
                            {record.status === 0 &&
                            <div>
                                <Tag type="lime" onClick={() => this.handleLookClick(record.ticketCode)}>
                                    查看取票码
                                </Tag>
                            </div>
                            }
                        </div>
                    </div>
                )
            },
            sorter: (a, b) => a.status - b.status
        }
    ];

    state = {
        orders: [],
        coupons: [],
        selectedTicketCode: '',
        selectedTicketOrder: '',
        alreadyBuyModalVisible: false,
        buyModalVisible: false
    };

    componentWillMount() {
        getAllTicketOrders().then((orders) => {
                this.setState({
                    orders: orders
                });
                if (orders.length === 0) {
                    alert('暂无订单，快去购票吧！')
                }
            }
        )
    }


    handleBuyClick = (orderId, cost) => {
        console.log(orderId);
        this.setState({
            buyModalVisible: true,
            selectedTicketOrder: orderId,
            cost: cost  // 为了方便判断可用优惠券
        })
    };

    handleLookClick = (ticketCode) => {
        this.setState({
            alreadyBuyModalVisible: true,
            selectedTicketCode: ticketCode
        })
    };

    handleCancelOrderClick = (orderId) => {
        cancelOrder({'orderId': orderId}).then(res => {
            console.log(res);
            alert("成功取消订单!");
            window.location.href = '/home/order';
        })
    };

    handleReturnTicketClick = (orderId) => {
        returnTicket({'orderId': orderId}).then(res => {
            alert("退票成功！");
            window.location.href = '/home/order';

        })
    };

    render() {
        return (
            <div className={styles.whole}>
                <Table columns={this.columns} dataSource={this.state.orders}/>
                <AlreadyBuyModal
                    modalVisible={this.state.alreadyBuyModalVisible}
                    selectedTicketCode={this.state.selectedTicketCode}
                    onOk={() => {
                        this.setState({
                            alreadyBuyModalVisible: false,
                        });
                    }}
                    onCancel={() => {
                        this.setState({
                            alreadyBuyModalVisible: false,
                        });
                    }}
                />
                {this.state.buyModalVisible ? <BuyModal
                    modalVisible={this.state.buyModalVisible}
                    order={this.state.orders.filter((order) => order.orderId === this.state.selectedTicketOrder)[0]}
                    onCancel={() => {
                        this.setState({
                            buyModalVisible: false,
                        });
                    }}
                /> : ""}
            </div>
        )
    }
}

export default WithHeaderFooterSider(Order)

