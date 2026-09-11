# hdebhb

hdebhb is a project accessing the rest-like API of
[BuchhaltungsButler](https://www.buchhaltungsbutler.de/) to extract some views
that are not provided in their own web interface.

The idea is to have the views in a format that allows easy cut'n'paste into
your favourite spreadsheet editor for further evaluation.

The project is independent of the creator of BuchhaltungsButler, so don't
expect support from their side when using hdebhb.

## Deployment

hdebhb needs a webserver for the static files and a proxy to
https://app.buchhaltungsbutler.de/api/. The latter is needed because browsers
refuse to access app.buchhaltungsbutler.de for javascript code provided by a
different domain.

See the `examples/` directory for a possible nginx configuration.

To generate the static files, run

```
npm run build
```

and then sync the files below `dist` to your server root.

## Documentation

The official API documentation can be found at
https://app.buchhaltungsbutler.de/docs/api/v1/.

## License

hdebhb is free software: you can redistribute it and/or modify it under the
terms of the GNU Affero General Public License version 3 as published by the
Free Software Foundation

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with
this program. If not, see <https://www.gnu.org/licenses/>.
