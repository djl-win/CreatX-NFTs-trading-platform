import * as React from "react";
import Button from "@mui/material/Button";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios from "axios";

class Login extends React.Component {
    state = {
        formData: {
            userUsername: '',
            userPassword: '',
        },
        submitted: false,
    }

    //Optimize handlechange
    handleChange = event => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    };

    handleClick = async(event) => {
        this.setState({ submitted: true }, () => {
            setTimeout(() => this.setState({ submitted: false }), 5000);
        });

        // console.log(this.state);

        event.preventDefault();
        const user = this.state.formData;

        // make axios post request
        const response = await axios({
            method: "post",
            url: "/5620/users",
            data: user
        }).catch(err => {
            console.log(err);
        })

    };

    render() {

        const { formData, submitted } = this.state;
        return (
            <div>


                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleClick}
                >

                    <TextValidator
                        name="userUsername"

                        id="component-outlined"
                        value={formData.userUsername}
                        onChange={this.handleChange}
                        label="username"
                        color="secondary"
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <br />


                    <TextValidator
                        id="component-outlined"
                        name="userPassword"
                        value={formData.userPassword}
                        onChange={this.handleChange}
                        label="pasword"
                        color="secondary"
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <br />

                    <Button
                        disabled={submitted}
                        color="secondary"
                        type="submit"
                        variant="outlined"
                        sx={{
                            width: "120px"
                        }}
                    >

                        {
                            (submitted && 'Ok!')
                            || (!submitted && 'Submit')
                        }

                    </Button>

                </ValidatorForm>

            </div>
        );
    }
};

export default Login;