import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBooksNum } from "../../actions/library/analytics";
import { Card } from "antd";

function BookTotalsCards(props) {
  // OnMount
  useEffect(() => {
    props.getBooksNum();
  }, []);
  return (
    <div className="mb-1 row">
      <div className="card col ml-1">
        <Card
          bordered={false}
          size="small"
          title="Total Book Titles"
          style={{ width: 300 }}
        >
          <p>{props.books_num.total_books}</p>
        </Card>
      </div>
      <div className="card col mr-1">
        <Card
          bordered={false}
          size="small"
          title="Total Books"
          style={{ width: 300 }}
        >
          <p>{props.books_num.total_book_instances}</p>
        </Card>
      </div>
    </div>
  );
}

BookTotalsCards.propTypes = {
  getBooksNum: PropTypes.func.isRequired,

  books_num: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  books_num: state.libraryAnalyticsReducer.books_num
});

export default connect(mapStateToProps, {
  getBooksNum
})(BookTotalsCards);
