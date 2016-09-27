module AssetsHelper
  def include_assets_tags
    manifest_file = "#{Rails.root}/public/assets/manifest.json"
    if File.exists?(manifest_file)
      manifest = JSON.parse(File.read(manifest_file))
      %Q{
        <script src="#{manifest['main']['js']}"></script>
        <link rel="stylesheet" href="#{manifest['main']['css']}">
      }.html_safe
    else
      %Q{<script src="http://localhost:8080/assets/bundle.js"></script>}.html_safe
    end
  end
end
