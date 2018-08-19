/**
 * Event queues are a simple way to send messages trough a system.
 */
import { dispatch } from "./setup";

/**
 * This is the message queue we'll store the state in.
 * This is not yet reactive...but could easilly be made so.
 */
export const messageQueue = [];

/**
 * Notify the message queue of new messages
 * Also a proxy for the redux thingy...
 */
export const notify = (action, payload) => {
    messageQueue.shift({ action, payload });
    dispatch({ type: action, payload });
};

/**
 * A helper function wrapping Promises with a notification property.
 * You can use this function to wrap your promises with a generic
 * "start", "success" and "stop" postfix
 */
export const wrapDelayedAction = (action, service) => {
    return (...params) => {
        notify(`${action}--started`);
        service
            .apply(null, params)
            .then(result => {
                notify(`${action}--success`, result);
            })
            .catch(error => {
                notify(`${action}--failed`, error);
            });
    };
};
