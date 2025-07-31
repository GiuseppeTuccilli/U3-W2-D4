//import { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

const AddComment = (props) => {
  //state = {
  //comment: {
  //comment: "",
  // rate: 1,
  //elementId: this.props.asin,
  //},
  // };

  const [comment, setComment] = useState({
    comment: "",
    rate: 1,
    elementId: props.asin,
  });

  // componentDidUpdate(prevProps) {
  //   if (prevProps.asin !== this.props.asin) {
  //   this.setState({
  //   comment: {
  //   ...this.state.comment,
  // elementId: this.props.asin,
  //},
  //    });
  // }
  //}

  useEffect(() => {
    setComment({ ...comment, elementId: props.asin });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments",
        {
          method: "POST",
          body: JSON.stringify(comment),
          headers: {
            "Content-type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODg3NmY3YzEyODg5NzAwMTVmMjdiYjQiLCJpYXQiOjE3NTM3MDYzNjQsImV4cCI6MTc1NDkxNTk2NH0.AJby4d7U0ZUy3us7IPO0p-mCmH3z-MNARBpvTftO51k",
          },
        }
      );
      if (response.ok) {
        alert("Recensione inviata!");
        // this.setState({
        //  comment: {
        //   comment: "",
        //  rate: 1,
        // elementId: props.asin,
        //   },
        // });
        setComment({ ...comment, elementId: props.asin });
      } else {
        throw new Error("Qualcosa è andato storto");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="my-3">
      <Form onSubmit={sendComment}>
        <Form.Group className="mb-2">
          <Form.Label>Recensione</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci qui il testo"
            value={comment.comment}
            onChange={
              (e) =>
                setComment({
                  ...comment,
                  comment: e.target.value,
                })

              // this.setState({
              // comment: {
              //   ...this.state.comment,
              //   comment: e.target.value,
              //  },
              //})
            }
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Valutazione</Form.Label>
          <Form.Control
            as="select"
            value={comment.rate}
            onChange={
              (e) =>
                setComment({
                  ...comment,
                  rate: e.target.value,
                })
              //  this.setState({
              //    comment: {
              //     ...this.state.comment,
              //    rate: e.target.value,
              //   },
              // })
            }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Invia
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
