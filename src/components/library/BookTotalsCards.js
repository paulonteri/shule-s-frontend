import React, { Fragment, useReducer, useEffect } from "react";
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
        <Fragment>
            <div className="col-6 col-md-3 mb-1 ">
                <Card
                    hoverable
                    size="small"
                    title="Total Book Titles"
                    className="shadow-sm rounded"
                >
                    <p>{props.books_num.total_books}</p>
                </Card>
            </div>
            <div className="col-6 col-md-3 mb-1">
                <Card
                    hoverable
                    size="small"
                    title="Total Books"
                    className="shadow-sm rounded"
                >
                    <p>{props.books_num.total_book_instances}</p>
                </Card>
            </div>
            <div className="col-6 col-md-3 mb-1">
                <Card
                    hoverable
                    size="small"
                    title="Books Issued"
                    className="shadow-sm rounded"
                >
                    <p>{props.books_num.books_issued}</p>
                </Card>
            </div>
            <div className="col-6 col-md-3 mb-1">
                <Card
                    hoverable
                    size="small"
                    title="Books Available"
                    className="shadow-sm rounded"
                >
                    <p>{props.books_num.books_available}</p>
                </Card>
            </div>
        </Fragment>
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
