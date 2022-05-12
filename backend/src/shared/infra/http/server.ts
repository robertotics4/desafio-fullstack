import { app } from './app';

app.listen(process.env.DEFAULT_API_PORT, () => {
  console.log(`Server started on port ${process.env.DEFAULT_API_PORT}`);
});
