# Node vs PHP vs Go

- [Disclaimer](#disclaimer)
- [Localhost Hello World](#test1)
- [Localhost JSON Encode](#test2)
- [Localhost MySQL JSON Encode](#test3)
- [Localhost Redis JSON Encode](#test4)
- [1GB LAN Test 5,6,7,8](#test5)


<a name="disclaimer"></a>
## Disclaimer

This is not a raw benchmark but a comparison of basic operations between the 3 platforms.  The personal nature of this repo is to help me decide on which HTTP JSON API platform to use for a particular project, which is why I include Laravel, Lumen, Iris...  I compare basic `hello world`, but also basic database queries and json encoding.  Feel free to add more comparison tests as needed.  You can find actual raw benchmarks of each platform elsewhere.

My original comparison can be read in the `README-OLD.md` file, which is not in-depth or accurate enough for my needs.




<a name="test1"></a>
## Test #1 - Localhost Hello World

A simple `hello world` test.  Everything including `wrk` is localhost.

##### Results

TODO: show results
Pure PHP7
Laravel PHP7
Lumen PHP7
Pure Node
Express Node
Koa Node
Pure Go
Iris Go

##### Setup

TODO: explain the actual test machine and setup, which versions, PHP-FPM nginx etc...




<a name="test2"></a>
## Test #2 - Localhost JSON Encode

A hard coded array encoded to JSON.  Everything including `wrk` is localhost.

##### Results

TODO: show results

##### Setup

TODO: explain the actual test machine and setup, which versions, PHP-FPM nginx etc...




<a name="test3"></a>
## Test #3 - Localhost MySQL JSON Encode

A MySQL result encoded to JSON.  Everything including `wrk` is localhost.

##### Results

TODO: show results

##### Setup

TODO: explain the actual test machine and setup, which versions, PHP-FPM nginx etc...
Mysql setup, and config optimizations etc...




<a name="test4"></a>
## Test #4 - Localhost Redis JSON Encode

A Redis result encoded to JSON.  Everything including `wrk` is localhost.

##### Results

TODO: show results

##### Setup

TODO: explain the actual test machine and setup, which versions, PHP-FPM nginx etc...
Redis setup and optimizations etc...




<a name="test5"></a>
## Test #5, 6, 7, 8

Same as test 1,2,3,4 but over 1GB LAN with physical servers and `wkr` on separate machine across network.




## Contributing

Thank you for considering contributing to this comparison!  Please add issues and comments or fork and pull!

Thanks to [@Allendar](https://github.com/Allendar) and [@borislemke](https://github.com/borislemke) for their contributions.

See also https://github.com/borislemke/nodejs_vs_php

### License

This comparison is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT)
