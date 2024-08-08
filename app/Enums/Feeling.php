<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class Feeling extends Enum
{
    const Angry = 1;
    const Sad = 2;
    const Happy = 3;

    public static function getKeyFromValue($value)
    {
        return array_search($value, self::getConstants());
    }

    protected static function getConstants(): array
    {
        $reflection = new \ReflectionClass(self::class);
        return $reflection->getConstants();
    }
}
