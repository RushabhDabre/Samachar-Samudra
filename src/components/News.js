import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types' //impt
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 9,
        category: 'general',
        apikey: process.env.REACT_APP_NEWS_API
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        apikey: PropTypes.string
    }

    capitalFunction = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalFunction(this.props.category)} - NewsMonkey`;
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(50);
        let parsedData = await data.json();
        this.props.setProgress(75);
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({
        //     articles: parsedData.articles,
        //     totalArticles: parsedData.totalResults,
        //     loading: false
        // })
        this.updateNews();
    }

    // handlePrevClick = async () => {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();
    //     // this.setState({ loading: true });

    //     // this.setState({
    //     //     page: this.state.page - 1,
    //     //     articles: parsedData.articles,
    //     //     loading: false
    //     // })

    //     this.setState({ page: this.state.page - 1 });
    //     this.updateNews();
    // }

    // handleNextClick = async () => {
    //     // console.log("Next");
    //     // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     //     this.setState({ loading: true });
    //     //     let data = await fetch(url);
    //     //     let parsedData = await data.json();
    //     //     // this.setState({loading:true});

    //     //     this.setState({
    //     //         page: this.state.page + 1,
    //     //         articles: parsedData.articles,
    //     //         loading: false
    //     //     })
    //     // }

    //     this.setState({ page: this.state.page + 1 });
    //     this.updateNews();
    // }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=00de0d05be1d4137bc14a3ddd10f9833&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    };

    refreshPage() {
        window.location.reload(false);
    };

    render() {
        return (
            <>
            
                <h1 className="text-center" style={{ margin: '80px 0px 30px 0px' }}>Samachar Samudra - Top {this.capitalFunction(this.props.category)} Headlines</h1>

                {this.state.loading && <Spinner />}
                {/* <div className='row'>
                    {!this.state.loading && this.state.articles?.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 80) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}
                            source={element.source.name} />
                        </div>
                    })}
                </div> */}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    style={{ overflow: 'hidden' }}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }

                    // below props only if you need pull down functionality
                    
                    // refreshFunction={this.refreshPage}
                    // pullDownToRefresh
                    // pullDownToRefreshThreshold={50}
                    
                    // pullDownToRefreshContent={
                    //     <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                    // }
                    // releaseToRefreshContent={
                    //     <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                    // }
                >
                    <div className="container">

                        <div className='row'>
                            {this.state.articles?.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 80) : ""}
                                        imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>

                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous </button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}> Next &rarr; </button>
                </div> */}
            </>
        )
    }
}

export default News


