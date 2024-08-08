<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class Difficulty extends Enum
{
    const Hard = 1;
    const Normal = 2;
    const Easy = 3;

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
