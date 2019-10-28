import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField'
import validateEmails from '../../utils/validateEmails'

const FIELDS = [
    {
        label: 'Survey Title',
        name: 'title'
    },
    {
        label: 'Subject Line',
        name: 'subject'
    },
    {
        label: 'Email Body',
        name: 'body'
    },
    {
        label: 'Recipient List',
        name: 'emails'
    }
]

class SurveyForm extends Component {
    renderFields() {
        return FIELDS.map((field, i) => {
            return (
                <Field
                    key = {i}
                    component = {SurveyField}
                    type = 'text'
                    label = {field.label}
                    name = {field.name}
                />
            )
        })
    }

    render() {
        return (
            <div>
                <form 
                    onSubmit = {this.props.handleSubmit(values => console.log(values))}
                >
                    {this.renderFields()}
                    <Link to = '/surveys' className = 'red btn-flat white-text'>
                        Cancel
                    </Link>
                    <button 
                        type = 'submit'
                        className = 'teal btn-flat right white-text'
                    >
                        Next
                        <i className ='material-icons right'>done</i>
                    </button>
                </form>
            </div>
        )
    }
}

function validate(values) {
    const errors = {}

    errors.emails = validateEmails(values.emails || '')

    FIELDS.forEach((field) => {
        if (!values[field.name]) {
            errors[field.name] = `You must provide a ${field.name}`
        }
    })

    return errors
}

export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm)