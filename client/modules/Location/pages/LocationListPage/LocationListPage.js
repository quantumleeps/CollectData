import React from 'react';
import { Link } from 'react-router';


class LocationListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
        this.getDetail = this.getDetail.bind(this)
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/locations")
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result.locations)
                    this.setState({
                        isLoaded: true,
                        items: result.locations
                    });
                });

    }

    getDetail(e) {
        event.preventDefault()
        console.log(e)
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <span>
                    {items.map(item => (
                        <div key={item.name}>
                            <b><Link to={`/locations/${item.cuid}`} >
                                {item.name}
                            </Link></b> -
                            {item.dateAdded}
                        </div>
                    ))}
                </span>
            );
        }
    }
}

export default LocationListPage;

