//import { Component } from 'react'
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";
import { useState, useEffect, useRef } from "react";

const CommentArea = (props) => {
  //state = {
  //  comments: [],
  //  isLoading: false,
  //  isError: false,
  // };

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // componentDidMount = async () => {
  //   try {
  //     let response = await fetch(
  //       'https://striveschool-api.herokuapp.com/api/comments/' +
  //         this.props.asin,
  //       {
  //         headers: {
  //           Authorization:
  //             'Bearer inserisci-qui-il-tuo-token',
  //         },
  //       }
  //     )
  //     console.log(response)
  //     if (response.ok) {
  //       let comments = await response.json()
  //       this.setState({ comments: comments, isLoading: false, isError: false })
  //     } else {
  //       console.log('error')
  //       this.setState({ isLoading: false, isError: true })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     this.setState({ isLoading: false, isError: true })
  //   }
  // }

  /*  componentDidUpdate = async (prevProps) => {
    if (prevProps.asin !== this.props.asin) {
      this.setState({
        isLoading: true,
      });
      try {
        let response = await fetch(
          "https://striveschool-api.herokuapp.com/api/comments/" +
            this.props.asin,
          {
            headers: {
              Authorization: "Bearer inserisci-qui-il-tuo-token",
            },
          }
        );
        console.log(response);
        if (response.ok) {
          let comments = await response.json();
          this.setState({
            comments: comments,
            isLoading: false,
            isError: false,
          });
        } else {
          this.setState({ isLoading: false, isError: true });
        }
      } catch (error) {
        console.log(error);
        this.setState({ isLoading: false, isError: true });
      }
    }
  };*/

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    setIsLoading(true);

    fetch("https://striveschool-api.herokuapp.com/api/comments/" + props.asin, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODg3NmY3YzEyODg5NzAwMTVmMjdiYjQiLCJpYXQiOjE3NTM3MDYzNjQsImV4cCI6MTc1NDkxNTk2NH0.AJby4d7U0ZUy3us7IPO0p-mCmH3z-MNARBpvTftO51k",
      },
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nella risposta del server");
        }
      })
      .then((comments) => {
        {
          /* this.setState({
          comments: comments,
          isLoading: false,
          isError: false,
        });*/
        }
        setComments(comments);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((error) => {
        console.log(error);
        {
          /*this.setState({
          isLoading: false,
          isError: true,
        });*/
        }
        setIsLoading(false);
        setIsError(true);
      });
  }, [props.asin]);

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
