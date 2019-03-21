import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Media } from 'reactstrap';
import "../Conpanion.css";
// import ConventionCard from "../convention/ConventionCard"

export default class Welcome extends Component {

    componentDidMount() {
        this.props.getAllData();
      }

    showName() {
        let sessionUser = sessionStorage.getItem("User");
        const currentUser = this.props.users.find(user => user.id === Number(sessionUser)) || {}
        return <h2>Welcome, <span>{currentUser.username}</span>!</h2>;
    }

    sortDate = (a, b) => {
        let date1 = new Date(a.startDate);
        let date2 = new Date(b.startDate)
        return date1 - date2;
    }

    getImageUrl = (convention) => {
        if (convention.thumbnail === "") {
            return "https://i.imgur.com/5QVJ5at.png"
        }
        else {
            return convention.thumbnail
        }
    }

    getNextCon = () => {
        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();

        if (day < 10) {
            day = `0${day}`;
        }
        if (month < 10) {
            month = `0${month}`
        }

        let yesterday = day - 1;
        let endOfYesterday = `${year}-${month}-${yesterday}`
        // console.log(new Date(endOfYesterday));

        let nextConvention = this.props.myConventions
            .sort(this.sortDate)
            .filter(con => (new Date(con.endDate) - new Date(endOfYesterday)) > 0)[0] || {}

        // console.log(nextConvention);
        // console.log(nextConvention.name);

        let str = nextConvention.name;
        if (str !== undefined) {
            str = str.replace(/\s+/g, '-').toLowerCase();
        }

        let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "12"]

        let start = new Date(nextConvention.startDate);
        let startMonth = start.getMonth();
        let startDate = start.getUTCDate();
        // let startYear = start.getFullYear();

        let end = new Date(nextConvention.endDate);
        let endMonth = end.getMonth();
        let endDate = end.getUTCDate();
        let endYear = end.getFullYear();

        let dateDisplay = months[startMonth] + " " + startDate + " - " + months[endMonth] + " " + endDate + ", " + endYear;

        return (
            <Media className="p-2">
                <Media left href="#" className="mr-3">
                    <Link to={`/conventions/${nextConvention.id}/${str}`}>
                        <Media object src={this.getImageUrl(nextConvention)} className="thumb" alt={nextConvention.name} />
                    </Link>
                </Media>
                <Media body className="d-flex justify-content-between align-items-center">
                    <div className="con_details">
                        <Link to={`/conventions/${nextConvention.id}/${str}`}>
                        <h4 className="mb-0">{nextConvention.name}</h4>
                        {dateDisplay}
                        <br />
                        {nextConvention.city}, {nextConvention.state}
                        </Link>
                    </div>
                </Media>
            </Media>
        )
    }


    render() {

        return (
            <section className="welcome">
                {this.showName()}

                <div className="next_con">
                <h3 className="mb-4 text-center">Your Next Convention</h3>
                <hr />
                {this.getNextCon()}
                </div>

            </section>
        )
    }
}