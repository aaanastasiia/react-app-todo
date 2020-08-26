import React from 'react';
import styles from './Footer.module.css';
import PropTypes from 'prop-types';
import classnames from 'classnames';


class Footer extends React.Component {
    render() {
        const { countAll, countDoneItems, countActiveItems, onClickFilter, filteredItems } = this.props;

        return (
                <div className={styles.title__wrap}>
                    <div className={styles.title__name}>
                        <h3 className={styles.title}>Список моих дел</h3>
                    </div>
                    <div className={styles.title__button}>
                            <button className={classnames({
                                    [styles.button]: true,
                                    [styles.selected]: filteredItems === 'Завершенные'
                                    })}
                                onClick={() => onClickFilter('Завершенные')}>
                                Завершенные <span>{countDoneItems}</span>
                            </button>
                            <button className={classnames({
                                    [styles.button]: true,
                                    [styles.selected]: filteredItems === 'Незавершенные'
                                    })}
                                onClick={() => onClickFilter('Незавершенные')}>
                                Незавершенные <span>{countActiveItems}</span>
                            </button>
                            <button className={classnames({
                                    [styles.button]: true,
                                    [styles.selected]: filteredItems === 'Все'
                                    })}
                                onClick={() => onClickFilter('Все')}>
                                Все <span>{countAll}</span>
                            </button>
                    </div>
                </div>
);
    }
}

Footer.propTypes = {
    countAll: PropTypes.number.isRequired
};

export default Footer;