<?php

namespace API\SYSTEM;

class Router extends App
{

    public static function ADD($uri = '/', $callback = null, $method = 'GET')
    {

        $uri = "/" . trim($uri, '/');

        static::$uri[]          = !empty($uri) && $uri != "/" ? $uri : "/";

        if ($callback != null)

            static::$actions[] = $callback;

        static::$method[]       = $method;
    }

    public static function GET($uri = '/', $callback = null)
    {

        $uri = "/" . trim($uri, '/');

        static::$uri[] = !empty($uri) && $uri != "/" ? $uri : "/";

        if ($callback != null)

            static::$actions[] = $callback;

        static::$method[] = "get";
    }

    public static function POST($uri = '/', $callback = null)
    {

        $uri = "/" . trim($uri, '/');

        static::$uri[]          = !empty($uri) && $uri != "/" ? $uri : "/";

        if ($callback != null)

            static::$actions[] = $callback;

        static::$method[]       = "POST";
    }

    public static function PUT($uri = '/', $callback = null)
    {

        $uri = "/" . trim($uri, '/');

        static::$uri[]          = !empty($uri) && $uri != "/" ? $uri : "/";

        if ($callback != null)

            static::$actions[] = $callback;

        static::$method[]       = "PUT";
    }

    public static function DELETE($uri = '/', $callback = null)
    {

        $uri = "/" . trim($uri, '/');

        static::$uri[]          = !empty($uri) && $uri != "/" ? $uri : "/";

        if ($callback != null)

            static::$actions[] = $callback;

        static::$method[]       = "DELETE";
    }
}
