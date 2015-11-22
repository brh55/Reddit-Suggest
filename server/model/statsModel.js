'use strict';

var model = {
    postDataSet: [],
    averages: {
        weekday: {
            Sunday: {
                scores: [],
                avgScore: []
            },
            Monday: {
                scores: [],
                avgScore: []
            },
            Tuesday: {
                scores: [],
                avgScore: []
            },
            Wednesday: {
                scores: [],
                avgScore: []
            },
            Thursday: {
                scores: [],
                avgScore: []
            },
            Friday: {
                scores: [],
                avgScore: []
            },
            Saturday: {
                scores: [],
                avgScore: []
            },
        },
        time: {
            '0:00': {
                scores: [],
                avgScore: [],
            },
            '1:00': {
                scores: [],
                avgScore: [],
            },
            '2:00': {
                scores: [],
                avgScore: [],
            },
            '3:00': {
                scores: [],
                avgScore: [],
            },
            '4:00': {
                scores: [],
                avgScore: [],
            },
            '5:00': {
                scores: [],
                avgScore: [],
            },
            '6:00': {
                scores: [],
                avgScore: [],
            },
            '7:00': {
                scores: [],
                avgScore: [],
            },
            '8:00': {
                scores: [],
                avgScore: [],
            },
            '9:00': {
                scores: [],
                avgScore: [],
            },
            '10:00': {
                scores: [],
                avgScore: [],
            },
            '11:00': {
                scores: [],
                avgScore: [],
            },
            '12:00': {
                scores: [],
                avgScore: [],
            },
            '13:00': {
                scores: [],
                avgScore: [],
            },
            '14:00': {
                scores: [],
                avgScore: [],
            },
            '15:00': {
                scores: [],
                avgScore: [],
            },
            '16:00': {
                scores: [],
                avgScore: [],
            },
            '17:00': {
                scores: [],
                avgScore: [],
            },
            '18:00': {
                scores: [],
                avgScore: [],
            },
            '19:00': {
                scores: [],
                avgScore: [],
            },
            '20:00': {
                scores: [],
                avgScore: [],
            },
            '21:00': {
                scores: [],
                avgScore: [],
            },
            '22:00': {
                scores: [],
                avgScore: [],
            },
            '23:00': {
                scores: [],
                avgScore: [],
            },
            '24:00': {
                scores: [],
                avgScore: [],
            }
        }
    },
    bestPost: [],
    bestScore: '',
    mostComments: '',
    suggestDay: ''
};

module.exports = model;
