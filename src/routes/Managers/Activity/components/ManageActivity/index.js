import React, {Component} from 'react'
import {Table, Descriptions, Popconfirm, Icon} from 'antd'
import Button from "../../../../../components/Button";
import ActivityInfoModal from "./ActivityInfoModal";


function CustomExpandIcon(props) {
    let text;
    if (props.expanded) {
        text = '&#9650';
    } else {
        text = '&#9660';
    }
    return (
        <a
            onClick={e => props.onExpand(props.record, e)}
            dangerouslySetInnerHTML={{__html: text}}
            style={{color: '#FFEB9E', cursor: 'pointer'}}
        />
    );
}


class ManageActivity extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            activityFormVisible: false,
        })
    };

    //设置新增活动表格可见状态
    showActivityForm = () => {
        this.setState({
            activityFormVisible: true
        })
    };


    closeActivityInfoModal = () => {
        this.setState({
            activityFormVisible: false
        })
    };

    operation = () => {
        return (
            <div>
                <span>操作</span>
                <Icon style={{fontSize: '18px', marginLeft: '10px', color: '#FFEB9E'}} type="plus-circle"
                      onClick={this.showActivityForm}/>
                <ActivityInfoModal activityFormVisible={this.state.activityFormVisible}
                                   closeActivityInfoModal={this.closeActivityInfoModal}
                                   movieOnShelfInfo={this.props.movieOnShelfInfo}
                />

            </div>)
    };

    columns = [
        {title: '活动编号', align: 'center', dataIndex: 'eventId', key: 'eventId'},
        {title: '活动名称', align: 'center', dataIndex: 'eventName', key: 'eventName'},
        {title: '活动描述', align: 'center', dataIndex: 'eventDescription', key: 'eventDescription'},
        {title: '开始时间', align: 'center', dataIndex: 'startTime', key: 'startTime'},
        {title: '结束时间', align: 'center', dataIndex: 'endTime', key: 'endTime'},
        {
            title: this.operation, align: 'center', dataIndex: 'delete',
            render: (text, record) =>
                this.props.activities.length >= 1 ? (
                    <Popconfirm title="确认删除该活动吗？" onConfirm={() => this.props.deleteActivity(record.eventId)}>
                        <Button type='yellow'>Delete</Button>
                    </Popconfirm>
                ) : null,
        }

    ];


    onExpand = (expanded, record) => {
        console.log('onExpand', expanded, record);
    };

    CustomExpandContent = (record) => {
        return (
            <div>
                <Descriptions
                    title={"优惠券名称： " + record.couponName}
                    border>
                    <Descriptions.Item label="优惠券描述">{record.couponDescription}</Descriptions.Item>
                    <Descriptions.Item label="参与电影" span={2}>{record.moviesIncluded.join(',')}</Descriptions.Item>
                    <Descriptions.Item label="有效时长">{record.couponExpiration}小时</Descriptions.Item>
                    <Descriptions.Item label="优惠">{'满'+record.couponThreshold +'减'+ record.couponDiscount+'元'}</Descriptions.Item>
                </Descriptions>
            </div>

        )
    };


    render() {
        const {activities} = this.props;
        return (
            <div>
                <Table columns={this.columns} dataSource={activities}
                       expandIcon={CustomExpandIcon}
                       expandedRowRender={this.CustomExpandContent}
                       onExpand={this.onExpand}
                       expandIconAsCell
                       rowKey={record => record.id}
                />
            </div>
        );
    }
}

export default ManageActivity
