import React from 'react';
import styles from './InputItem.module.css';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import classnames from 'classnames';

class InputItem extends React.Component {
    state = {
        inputValue: '',
        error: false,
        errorText: ''
    };

    onLabelChange = event => {
        this.setState({
          inputValue: event.target.value,
        });
      };

    onButtonClick = () => {
        let { onClickAdd, items } = this.props;
        let error = false;
        items.forEach(item => {
          if (item.value === this.state.inputValue) {
            error = true;
          }
        });
        if (this.state.inputValue === '' || error) {
          this.setState({
            error: true,
            errorText: error ? 'Это дело уже есть в списке' : 'Кажется, вы забыли ввести дело'
          });
          setTimeout(() => {
            this.setState({
                error: '',
                errorText: '',
            });
          }, 2000);
        } else {
          this.setState({
            inputValue: '',
            error: false
          });
          onClickAdd(this.state.inputValue);        
    }
};

    render() {
        const { error, errorText } = this.state;
        return (
            <div className={styles.wrap}>
                <div
                    className={classnames({
                        [styles.input_style]: true,
                        [styles.error]: error
                    })}
                    >
                <p className={styles.error__text}>{errorText}</p>
                <input 
                    className={styles.input}
                    placeholder="Просто введите сюда название дела..." 
                    value={this.state.inputValue}
                    onChange={event => this.onLabelChange(event)}
                />
                <Fab size='small'
                    aria-label='add'
                    className={styles.add}
                    onClick={this.onButtonClick}>
                <AddIcon />
            </Fab>
            </div>
        </div>);
        }
    }

InputItem.propTypes = {
    inputValue: PropTypes.string,
    inputError: PropTypes.bool,
    onClickAdd: PropTypes.func.isRequired,
    onButtonClick: PropTypes.func
};

export default InputItem;