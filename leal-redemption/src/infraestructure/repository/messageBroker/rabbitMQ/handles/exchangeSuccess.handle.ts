export default (commitMessage: Function, channel: string, container: any) => {
  return async (message: any) => {
    const content = JSON.parse(message.content);
    const { points, clientId } = JSON.parse(content);

    return commitMessage(channel, message);
  };
};
