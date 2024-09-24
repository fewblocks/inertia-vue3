# Sass変数を含むファイルから色コードを抽出してJSON形式で新しいファイルに書き込む

# 入力ファイルと出力ファイルのパス
$inputFile = "_variables.scss"
$outputFile = "output.json"

# JSONオブジェクトを初期化
$jsonObject = @{
    colors = @()
}

# 入力ファイルの内容を行ごとに読み込む
Get-Content $inputFile | ForEach-Object {
    $line = $_

    # 正規表現で変数と色コードをマッチさせる
    if ($line -match '^\$([\w-]+):\s*(#[0-9a-fA-F]{3,6});') {
        $variableName = $matches[1]
        $colorCode = $matches[2]

        # JSONオブジェクトに追加
        $jsonObject.colors += @{
            name = $variableName
            value = $colorCode
        }

        # コンソールにも表示
        Write-Host "変数: $variableName 色コード: $colorCode"
    }
}

# JSONオブジェクトをファイルに書き込む
$jsonString = $jsonObject | ConvertTo-Json -Depth 3
Set-Content -Path $outputFile -Value $jsonString

Write-Host "完了: 色コードが $outputFile に書き込まれました。"
