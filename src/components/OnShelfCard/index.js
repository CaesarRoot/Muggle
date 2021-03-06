import React, {Component} from 'react'
import styles from './index.module.less';
import {Tag, Icon} from "antd";
import {delMovieOnShelf} from "../../services/apiOnShelf";

class OnShelfCard extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        const {posterUrl, movieName, movieYear, movieLength, movieType, isOnshow, movieId} = this.props;
        return (
            <div className={styles.whole}>
                <div className={styles['image-container']}>
                    <img className={styles.image} src={posterUrl} alt='海报'/>
                </div>
                <div className={styles['info-container']}>
                    <div className={styles.mainInfo}>
                        <div className={styles.movieName}>{movieName}</div>
                    </div>
                    <div className={styles['year-time-container']}>
                        <div className={styles.time}>
                            {movieYear}
                            <div className={styles.dot}/>
                            {movieLength} min
                            <div className={styles.tag}>
                                <Tag color={isOnshow ? 'gold' : 'gray'}>
                                    {isOnshow ? '已上映' : '未上映'}
                                </Tag>
                            </div>
                        </div>
                        <div className={styles.movieType}>{movieType}
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

export default OnShelfCard
