/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

require('dotenv').config({path: path.resolve(".env")})
require('ts-node/register')

const umzug = require('../db.config')

umzug.migrator.runAsCLI()