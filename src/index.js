import { Scrapper } from './scrapper.js';

const others = [`SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`]
others.forEach((eventType) => {
    process.on(eventType, exitRouter.bind(null, { exit: true }));
});

function exitRouter(options, exitCode) {
    if (exitCode || exitCode === 0) console.log(`ExitCode ${exitCode}`);
    if (options.exit) process.exit();
}

const scrapper = new Scrapper();

const start = async () => {
    await scrapper.init();
}

(async () => {
    await start()
})()

function exitHandler(exitCode) {
    console.log(`ExitCode ${exitCode}`);
    scrapper.dumpToCSV();
    console.log('Exiting finally...')
}

process.on('exit', exitHandler)