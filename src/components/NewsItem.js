import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right:'0'}}>
                        <span className="badge rounded-pill bg-success"> {source} </span>
                    </div>
                    <img src={!imageUrl ? "https://images.hindustantimes.com/tech/img/2023/04/02/1600x900/asteroid_Pixabay_2_1679838637005_1680419069598_1680419069598.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
