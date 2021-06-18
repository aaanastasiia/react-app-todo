import React from "react";
import Item from "../Item/Item";
import styles from "./ItemList.module.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CancelIcon from "@material-ui/icons/Cancel";
import frame from "./img/frame.png";
import PropTypes from "prop-types";

class ItemList extends React.Component {
  render() {
    const { onClickDone, onClickDelete, filter } = this.props;

    return (
      <div>
        {filter?.length !== 0 ? (
          <ul className={styles.wrap}>
            {filter.map((item) => (
              <li key={item.value}>
                <div className={styles.item__wrap}>
                  <FormControlLabel
                    className={styles.checkbox}
                    control={
                      <Checkbox
                        checked={item.isDone}
                        icon={
                          <RadioButtonUncheckedIcon
                            className={styles.checkbox__icon}
                          />
                        }
                        checkedIcon={
                          <CheckCircleIcon className={styles.checkbox__icon} />
                        }
                        value="checkedB"
                        color="primary"
                        onClick={() => onClickDone(item.id)}
                      />
                    }
                    label={
                      <Item
                        value={item.value}
                        isDone={item.isDone}
                        id={item.id}
                        onClickDone={onClickDone}
                        onClickDelete={onClickDelete}
                      />
                    }
                  />
                  <Tooltip
                    title="Удалить"
                    onClick={() => onClickDelete(item.id)}
                  >
                    <IconButton aria-label="delete">
                      <CancelIcon
                        fontSize="small"
                        className={styles.delete__icon}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.noItems}>
            <img className={styles.noItems__img} alt="/" src={frame}></img>
            <p className={styles.noItems__text}>
              Вы ещё не добавили ни одной задачи
            </p>
            <p className={styles.noItems__now}>Сделайте это прямо сейчас!</p>
          </div>
        )}
      </div>
    );
  }
}

ItemList.propTypes = {
  items: PropTypes.array.isRequired,
  onClickDone: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
};

export default ItemList;
