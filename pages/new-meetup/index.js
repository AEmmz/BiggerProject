import React, { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";

const NewMeetupPage = (props) => {
  const router = useRouter();
  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await axios.post("/api/new-meetup", enteredMeetupData);
    console.log(response.data);
    await router.push("/");
  };

  return (
    <Fragment>
      <Head>
        <title>Add React Meetups</title>
        <meta name={"description"} content={"Add a meetup"} />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetupPage;
