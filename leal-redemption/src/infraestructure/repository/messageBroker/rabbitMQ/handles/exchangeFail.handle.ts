export default (commitMessage: Function, channel: string, container: any) => {
  return async (message: any) => {
    const content = JSON.parse(message.content);
    const { message: errorMessage, status } = JSON.parse(content);
    console.log(errorMessage, status);
    return commitMessage(channel, message);
  };
};
