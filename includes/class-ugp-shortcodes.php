<?php

namespace UGP\Plugin;

/**
 * @since   1.0
 */

defined('ABSPATH') || exit;

/**
 * WP Settings Class.
 */
class Shortcodes
{

    /**
     * The single instance of the class.
     *
     * @since 1.0
     */
    protected static $_instance = null;

    private $location = array('U.S.' => 'U.S.', 'East Coast' => 'PADD 1', 'New England' => 'PADD 1A', 'Central Atlantic' => 'PADD 1B', 'Lower Atlantic' => 'PADD 1C', 'Midwest' => 'PADD 2', 'Gulf Coast' => 'PADD 3', 'Rocky Mountain' => 'PADD 4', 'West Coast' => 'PADD 5', 'California' => 'CALIFORNIA');

    private $api_key = 'jtxw1tp7sOIBsYhTQLDIEmGgumigkvxqnlQYBDvh';

    /**
     * Class constructor.
     *
     * @since 1.0.0
     */
    public function __construct()
    {
        // Current Gas and Diesel price shortcode
        add_shortcode('usa_current_average_gas_price', array($this, 'usa_current_average_gas_price_shortcode'));
        add_action("wp_ajax_ugp_get_usa_current_average_gas_price", array($this, 'ugp_get_usa_current_average_gas_price'));

        // USA gas prices table shortcode
        add_shortcode('usa_gas_prices_table', array($this, 'usa_gas_prices_table_shortcode'));
        add_action("wp_ajax_ugp_get_usa_gas_prices_table_shortcode", array($this, 'ugp_get_usa_gas_prices_table_shortcode'));

        // USA gas prices chart shortcode
        add_shortcode('usa_gas_prices_chart', array($this, 'usa_gas_prices_chart_shortcode'));
        add_action("wp_ajax_ugp_get_usa_gas_prices_chart_shortcode", array($this, 'ugp_get_usa_gas_prices_chart_shortcode'));

        add_action("wp_ajax_ugp_get_gasoline_year_data", array($this, 'ugp_get_gasoline_year_data'));
        add_action("wp_ajax_nopriv_ugp_get_gasoline_year_data", array($this, 'ugp_get_gasoline_year_data'));
        add_action("wp_ajax_ugp_get_diesel_year_data", array($this, 'ugp_get_diesel_year_data'));
        add_action("wp_ajax_nopriv_ugp_get_diesel_year_data", array($this, 'ugp_get_diesel_year_data'));

        // USA gas prices PADD Visual shortcode
        add_shortcode('usa_padd_prices', array($this, 'usa_padd_prices'));
        add_action("wp_ajax_ugp_get_gasoline_and_diesel_week_data", array($this, 'ugp_get_gasoline_and_diesel_week_data'));
        add_action("wp_ajax_nopriv_ugp_get_gasoline_and_diesel_week_data", array($this, 'ugp_get_gasoline_and_diesel_week_data'));
    }

    /**
     * Main Instance.
     * 
     * @since 1.0
     */
    public static function instance()
    {

        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }


    public function ugp_get_usa_gas_prices_table_shortcode()
    {
        try {
            $type = isset($_POST['type']) ? $_POST['type'] : 'gasoline';
            $data = $this->usa_gas_prices_table_shortcode(array(
                'type' => $type,
                'dataonly' => true
            ));
            wp_send_json(array(
                'status' => 'success',
                'data' => $data
            ));
        } catch (\Exception $e) {

            wp_send_json(array(
                'status' => 'error',
                'message' => $e->getMessage()
            ));
        }
    }

    /**
     * USA gas prices table
     *
     * @since 1.0
     * @access public
     */
    public function usa_gas_prices_table_shortcode($atts)
    {

        $atts = shortcode_atts(array(
            'type' => 'gasoline',
            'dataonly' => false,
            'title' => '',
            'subtitle' => ''
        ), $atts);

        extract($atts);

        // Fetch year ago data
        $monday = date('Y-m-d', strtotime("last Monday"));
        $last_year = date('Y-m-d', strtotime('- 1 year', strtotime("last Monday")));

        // Store to wp uploads folder
        $upload_dir = wp_upload_dir();
        $base_dir = $upload_dir['basedir'] . '/usa-gas-prices/';

        $data = array();
        $year_ago = array();

        ob_start();

        if ($type === 'gasoline') {

            $file_name = $base_dir . 'usa_gas_prices_table_shortcode-gasoline.json';

            // Check if json cache exist
            if (file_exists($file_name)) {

                // Read the JSON file  
                $json = file_get_contents($file_name);

                // Decode the JSON file 
                $json_data = json_decode($json, true);
                $data = isset($json_data['data']) ? $json_data['data'] : array();
                $year_ago = isset($json_data['year_ago']) ? $json_data['year_ago'] : array();
            }

            if (empty($data) || empty($year_ago)) {

                // Fetch 3 weeks data
                $data = $this->api_request('https://api.eia.gov/v2/petroleum/pri/gnd/data?data[]=value&frequency=weekly&sort[0][column]=period&sort[0][direction]=desc&api_key=' . $this->api_key . '&facets[series][]=EMM_EPMR_PTE_NUS_DPG&facets[series][]=EMM_EPMR_PTE_R10_DPG&facets[series][]=EMM_EPMR_PTE_R1X_DPG&facets[series][]=EMM_EPMR_PTE_R1Y_DPG&facets[series][]=EMM_EPMR_PTE_R1Z_DPG&facets[series][]=EMM_EPMR_PTE_R20_DPG&facets[series][]=EMM_EPMR_PTE_R30_DPG&facets[series][]=EMM_EPMR_PTE_R40_DPG&facets[series][]=EMM_EPMR_PTE_R50_DPG&facets[series][]=EMM_EPMR_PTE_R5XCA_DPG&length=30');

                $year_ago = $this->api_request('https://api.eia.gov/v2/petroleum/pri/gnd/data?data[]=value&frequency=weekly&sort[0][column]=period&sort[0][direction]=asc&api_key=' . $this->api_key . '&facets[series][]=EMM_EPMR_PTE_NUS_DPG&facets[series][]=EMM_EPMR_PTE_R10_DPG&facets[series][]=EMM_EPMR_PTE_R1X_DPG&facets[series][]=EMM_EPMR_PTE_R1Y_DPG&facets[series][]=EMM_EPMR_PTE_R1Z_DPG&facets[series][]=EMM_EPMR_PTE_R20_DPG&facets[series][]=EMM_EPMR_PTE_R30_DPG&facets[series][]=EMM_EPMR_PTE_R40_DPG&facets[series][]=EMM_EPMR_PTE_R50_DPG&facets[series][]=EMM_EPMR_PTE_R5XCA_DPG&length=10&start=' . $last_year . '&end=' . $monday);

                // Store the data to json cache
                if (!empty($data) && !empty($year_ago)) {

                    // Creates the dir
                    if (!is_dir($base_dir)) {
                        wp_mkdir_p($base_dir);
                    }

                    // Save file to wp-uploads/usa-gas-prices
                    file_put_contents($file_name, json_encode(array('data' => $data, 'year_ago' => $year_ago)));
                }
            }

            require_once(UGP_TEMPLATES_ROOT_DIR . 'gasoline-prices-table.php');
        } else {

            $file_name = $base_dir . 'usa_gas_prices_table_shortcode-diesel.json';

            // Check if json cache exist
            if (file_exists($file_name)) {

                // Read the JSON file  
                $json = file_get_contents($file_name);

                // Decode the JSON file 
                $json_data = json_decode($json, true);
                $data = isset($json_data['data']) ? $json_data['data'] : array();
                $year_ago = isset($json_data['year_ago']) ? $json_data['year_ago'] : array();
            }

            if (empty($data) || empty($year_ago)) {

                // Fetch 3 weeks data
                $data = $this->api_request('https://api.eia.gov/v2/petroleum/pri/gnd/data?data[]=value&frequency=weekly&sort[0][column]=period&sort[0][direction]=desc&api_key=' . $this->api_key . '&facets[series][]=EMD_EPD2DXL0_PTE_NUS_DPG&facets[series][]=EMD_EPD2DXL0_PTE_R10_DPG&facets[series][]=EMD_EPD2D_PTE_R1X_DPG&facets[series][]=EMD_EPD2DXL0_PTE_R1Y_DPG&facets[series][]=EMD_EPD2D_PTE_R1Z_DPG&facets[series][]=EMD_EPD2D_PTE_R20_DPG&facets[series][]=EMD_EPD2D_PTE_R30_DPG&facets[series][]=EMD_EPD2D_PTE_R40_DPG&facets[series][]=EMD_EPD2D_PTE_R50_DPG&facets[series][]=EMD_EPD2DXL0_PTE_R5XCA_DPG&facets[series][]=EMD_EPD2DXL0_PTE_SCA_DPG&length=33');

                $year_ago = $this->api_request('https://api.eia.gov/v2/petroleum/pri/gnd/data?data[]=value&frequency=weekly&sort[0][column]=period&sort[0][direction]=asc&api_key=' . $this->api_key . '&facets[series][]=EMD_EPD2DXL0_PTE_NUS_DPG&facets[series][]=EMD_EPD2DXL0_PTE_R10_DPG&facets[series][]=EMD_EPD2D_PTE_R1X_DPG&facets[series][]=EMD_EPD2DXL0_PTE_R1Y_DPG&facets[series][]=EMD_EPD2D_PTE_R1Z_DPG&facets[series][]=EMD_EPD2D_PTE_R20_DPG&facets[series][]=EMD_EPD2D_PTE_R30_DPG&facets[series][]=EMD_EPD2D_PTE_R40_DPG&facets[series][]=EMD_EPD2D_PTE_R50_DPG&facets[series][]=EMD_EPD2DXL0_PTE_R5XCA_DPG&facets[series][]=EMD_EPD2DXL0_PTE_SCA_DPG&length=11&start=' . $last_year . '&end=' . $monday);

                // Store the data to json cache
                if (!empty($data) && !empty($year_ago)) {

                    // Creates the dir
                    if (!is_dir($base_dir)) {
                        wp_mkdir_p($base_dir);
                    }

                    // Save file to wp-uploads/usa-gas-prices
                    file_put_contents($file_name, json_encode(array('data' => $data, 'year_ago' => $year_ago)));
                }
            }

            require_once(UGP_TEMPLATES_ROOT_DIR . 'diesel-prices-table.php');
        }

        $content = ob_get_clean();

        return $content;
    }


    public function ugp_get_usa_gas_prices_chart_shortcode()
    {
        try {
            $type = isset($_POST['type']) ? $_POST['type'] : 'gasoline';
            $data = $this->usa_gas_prices_chart_shortcode(array(
                'type' => $type
            ));
            wp_send_json(array(
                'status' => 'success',
                'data' => $data
            ));
        } catch (\Exception $e) {

            wp_send_json(array(
                'status' => 'error',
                'message' => $e->getMessage()
            ));
        }
    }

    /**
     * USA gas prices chart
     *
     * @since 1.0
     * @access public
     */
    public function usa_gas_prices_chart_shortcode($atts)
    {

        $atts = shortcode_atts(array(
            'type' => 'gasoline',
            'title' => $atts['type'] === 'gasoline' && $atts['title'] == "" ? 'Regular Gasoline Prices' : 'On-Highway Diesel Fuel Prices',
            'subtitle' => '(dollars per gallon)',
            'location' => $this->location
        ), $atts);

        extract($atts);
        ob_start(); ?>
        <div class="usa-gas-prices-chart-wrapper">
            <h2><?php echo $title; ?></h2>
            <span><?php echo $subtitle; ?></span>
            <div class="usa-gas-prices-chart" data-gas-prices-attr="<?php echo htmlspecialchars(json_encode($atts), ENT_QUOTES, 'UTF-8'); ?>">
                <span>Loading...</span>
            </div>
        </div>

    <?php

        $content = ob_get_clean();
        return $content;
    }

    /**
     * Get fuel savings data.
     * 
     * @since 1.0
     */
    public function ugp_get_gasoline_year_data()
    {

        if (!defined('DOING_AJAX') || !DOING_AJAX) {
            wp_die();
        }

        /**
         * Verify nonce
         */
        if (isset($_POST['nonce']) && !wp_verify_nonce($_POST['nonce'], 'settings_nonce')) {
            wp_die();
        }

        try {

            $data = array();

            $timespan = array(
                '1 Month' => strtotime("- 1 Month"),
                '3 Months' => strtotime("- 3 Month"),
                '1 Year' => strtotime("- 1 Year"),
                '2 Years' => strtotime("- 2 Year"),
                'selected' => '1 Year'
            );

            // Store to wp uploads folder
            $upload_dir = wp_upload_dir();
            $base_dir = $upload_dir['basedir'] . '/usa-gas-prices/';
            $file_name = $base_dir . 'ugp_get_gasoline_year_data.json';

            // Check if json cache exist
            if (file_exists($file_name)) {

                // Read the JSON file  
                $json = file_get_contents($file_name);

                // Decode the JSON file 
                $data = json_decode($json, true);
            }

            // Fetch 2 year ago data
            $monday = date('Y-m-d', strtotime("last Monday"));
            $last_2year = date('Y-m-d', strtotime('- 2 year', strtotime("last Monday")));

            // If there's NO cache then fetch 2 year gas price data
            if (empty($data)) {

                $data = $this->api_request('https://api.eia.gov/v2/petroleum/pri/gnd/data?data[]=value&frequency=weekly&sort[0][column]=period&sort[0][direction]=asc&api_key=' . $this->api_key . '&facets[series][]=EMM_EPMR_PTE_NUS_DPG&facets[series][]=EMM_EPMR_PTE_R10_DPG&facets[series][]=EMM_EPMR_PTE_R1X_DPG&facets[series][]=EMM_EPMR_PTE_R1Y_DPG&facets[series][]=EMM_EPMR_PTE_R1Z_DPG&facets[series][]=EMM_EPMR_PTE_R20_DPG&facets[series][]=EMM_EPMR_PTE_R30_DPG&facets[series][]=EMM_EPMR_PTE_R40_DPG&facets[series][]=EMM_EPMR_PTE_R50_DPG&facets[series][]=EMM_EPMR_PTE_SCA_DPG&start=' . $last_2year . '&end=' . $monday);

                // Store the data to json cache
                if (!empty($data) && count($data) == 10) {

                    // Creates the dir
                    if (!is_dir($base_dir)) {
                        wp_mkdir_p($base_dir);
                    }

                    // Save file to wp-uploads/usa-gas-prices
                    file_put_contents($file_name, json_encode($data));
                }
            }

            wp_send_json(array(
                'status' => 'success',
                'orig' => $data,
                'order' => $this->location,
                'timespan' => $timespan
            ));
        } catch (\Exception $e) {

            wp_send_json(array(
                'status' => 'error',
                'message' => $e->getMessage()
            ));
        }
    }

    /**
     * Get diesel savings data.
     * 
     * @since 1.0
     */
    public function ugp_get_diesel_year_data()
    {

        if (!defined('DOING_AJAX') || !DOING_AJAX) {
            wp_die();
        }

        /**
         * Verify nonce
         */
        if (isset($_POST['nonce']) && !wp_verify_nonce($_POST['nonce'], 'settings_nonce')) {
            wp_die();
        }

        try {

            $data = array();

            // Store to wp uploads folder
            $upload_dir = wp_upload_dir();
            $base_dir = $upload_dir['basedir'] . '/usa-gas-prices/';
            $file_name = $base_dir . 'ugp_get_diesel_year_data.json';

            // Check if json cache exist
            if (file_exists($file_name)) {

                // Read the JSON file  
                $json = file_get_contents($file_name);

                // Decode the JSON file 
                $data = json_decode($json, true);
            }

            $timespan = array(
                '1 Month' => strtotime("- 1 Month"),
                '3 Months' => strtotime("- 3 Month"),
                '1 Year' => strtotime("- 1 Year"),
                '2 Years' => strtotime("- 2 Year"),
                'selected' => '1 Year'
            );

            // Fetch year ago data
            $monday = date('Y-m-d', strtotime("last Monday"));
            $last_2year = date('Y-m-d', strtotime('- 2 year', strtotime("last Monday")));

            if (empty($data)) {

                $data = $this->api_request('https://api.eia.gov/v2/petroleum/pri/gnd/data?data[]=value&frequency=weekly&sort[0][column]=period&sort[0][direction]=asc&api_key=' . $this->api_key . '&facets[series][]=EMD_EPD2DXL0_PTE_NUS_DPG&facets[series][]=EMD_EPD2DXL0_PTE_R10_DPG&facets[series][]=EMD_EPD2D_PTE_R1X_DPG&facets[series][]=EMD_EPD2DXL0_PTE_R1Y_DPG&facets[series][]=EMD_EPD2D_PTE_R1Z_DPG&facets[series][]=EMD_EPD2D_PTE_R20_DPG&facets[series][]=EMD_EPD2D_PTE_R30_DPG&facets[series][]=EMD_EPD2D_PTE_R40_DPG&facets[series][]=EMD_EPD2D_PTE_R50_DPG&facets[series][]=EMD_EPD2DXL0_PTE_R5XCA_DPG&facets[series][]=EMD_EPD2DXL0_PTE_SCA_DPG&start=' . $last_2year . '&end=' . $monday);

                // Store the data to json cache
                if (!empty($data) && count($data) == 11) {

                    // Creates the dir
                    if (!is_dir($base_dir)) {
                        wp_mkdir_p($base_dir);
                    }

                    // Save file to wp-uploads/usa-gas-prices
                    file_put_contents($file_name, json_encode($data));
                }
            }

            wp_send_json(array(
                'status' => 'success',
                'orig' => $data,
                'order' => $this->location,
                'timespan' => $timespan
            ));
        } catch (\Exception $e) {

            wp_send_json(array(
                'status' => 'error',
                'message' => $e->getMessage()
            ));
        }
    }

    public function ugp_get_usa_current_average_gas_price()
    {
        try {
            $type = isset($_POST['type']) ? $_POST['type'] : 'gasoline';
            $data = $this->usa_current_average_gas_price_shortcode(array(
                'type' => $type,
                'dataonly' => true
            ));
            wp_send_json(array(
                'status' => 'success',
                'data' => $data
            ));
        } catch (\Exception $e) {

            wp_send_json(array(
                'status' => 'error',
                'message' => $e->getMessage()
            ));
        }
    }

    /**
     * Display current average gas prices
     *
     * @since 1.0
     * @access public
     */
    public function usa_current_average_gas_price_shortcode($atts)
    {

        $atts = shortcode_atts(array(
            'type' => 'gasoline',
            'dataonly' => false
        ), $atts);

        extract($atts);

        $data = array();

        // Store to wp uploads folder
        $upload_dir = wp_upload_dir();
        $base_dir = $upload_dir['basedir'] . '/usa-gas-prices/';

        if ($type === 'gasoline') {

            $file_name = $base_dir . 'usa_current_average_gas_price_shortcode-gasoline.json';

            // Check if json cache exist
            if (file_exists($file_name)) {

                // Read the JSON file  
                $json = file_get_contents($file_name);

                // Decode the JSON file 
                $data = json_decode($json, true);
            }

            if (empty($data)) {

                $data = $this->api_request('https://api.eia.gov/v2/petroleum/pri/gnd/data?data[]=value&frequency=weekly&sort[0][column]=period&sort[0][direction]=desc&api_key=' . $this->api_key . '&facets[series][]=EMM_EPMR_PTE_NUS_DPG&length=1');

                // Store the data to json cache
                if (!empty($data) && count($data) == 1) {

                    // Creates the dir
                    if (!is_dir($base_dir)) {
                        wp_mkdir_p($base_dir);
                    }

                    // Save file to wp-uploads/usa-gas-prices
                    file_put_contents($file_name, json_encode($data));
                }
            }
        } else {

            $file_name = $base_dir . 'usa_current_average_gas_price_shortcode-diesel.json';

            // Check if json cache exist
            if (file_exists($file_name)) {

                // Read the JSON file  
                $json = file_get_contents($file_name);

                // Decode the JSON file 
                $data = json_decode($json, true);
            }

            if (empty($data)) {

                $data = $this->api_request('https://api.eia.gov/v2/petroleum/pri/gnd/data?data[]=value&frequency=weekly&sort[0][column]=period&sort[0][direction]=desc&api_key=' . $this->api_key . '&facets[series][]=EMD_EPD2DXL0_PTE_NUS_DPG&length=1');

                // Store the data to json cache
                if (!empty($data) && count($data) == 1) {

                    // Creates the dir
                    if (!is_dir($base_dir)) {
                        wp_mkdir_p($base_dir);
                    }

                    // Save file to wp-uploads/usa-gas-prices
                    file_put_contents($file_name, json_encode($data));
                }
            }
        }

        ob_start();
        $price = 0;
        $date = '';
        if (!empty($data) && isset($data['U.S.'])) {
            $price = number_format((float)$data['U.S.'][0]['value'], 2, '.', '');
            $date = $data['U.S.'][0]['period'];
        }

        // For Backend block editor
        // Return data only
        if ($dataonly) {
            return array(
                'date' => $date,
                'price' => $price
            );
        }

    ?><div class="todays-gas-price-average">
            <div>
                <b><?php echo $type == 'gasoline' ? 'TODAYS GAS PRICE' : 'TODAYS DIESEL PRICE'; ?></b>
                <p><?php echo $type == 'gasoline' ? 'NATIONAL AVERAGE GASOLINE PRICE' : 'NATIONAL AVERAGE ROAD DIESEL PRICE'; ?></p>
                <p>AS OF <?php echo $date; ?></p>
            </div>
            <div><?php echo '$' . $price; ?></div>
        </div>
    <?php

        $content = ob_get_clean();
        return $content;
    }


    /**
     * USA gas prices PADD Visual
     *
     * @since 1.0
     * @access public
     */
    public function usa_padd_prices($atts)
    {

        $atts = shortcode_atts(array(
            // 'height' => '670px',
            'width' => '100%'
        ), $atts);

        ob_start();

    ?><div id="usa-padd-prices" data-padd-prices-attr="<?php echo htmlspecialchars(json_encode($atts), ENT_QUOTES, 'UTF-8'); ?>"></div>
<?php

        $content = ob_get_clean();
        return $content;
    }

    /**
     * Get gasoline and diesel week data
     *
     * @since 1.0
     * @access public
     */
    public function ugp_get_gasoline_and_diesel_week_data()
    {

        if (!defined('DOING_AJAX') || !DOING_AJAX) {
            wp_die();
        }

        /**
         * Verify nonce
         */
        if (isset($_POST['nonce']) && !wp_verify_nonce($_POST['nonce'], 'gas_and_diesel_week_data_nonce')) {
            wp_die();
        }

        try {

            $gasoline = array();
            $diesel = array();

            // Store to wp uploads folder
            $upload_dir = wp_upload_dir();
            $base_dir = $upload_dir['basedir'] . '/usa-gas-prices/';
            $file_name = $base_dir . 'ugp_get_gasoline_and_diesel_week_data.json';

            // Check if json cache exist
            if (file_exists($file_name)) {

                // Read the JSON file  
                $json = file_get_contents($file_name);

                // Decode the JSON file 
                $data = json_decode($json, true);
                $gasoline = isset($data['gasoline']) ? $data['gasoline'] : array();
                $diesel = isset($data['diesel']) ? $data['diesel'] : array();
            }

            if (empty($gasoline) && empty($diesel)) {

                $gasoline = $this->api_request('https://api.eia.gov/v2/petroleum/pri/gnd/data?data[]=value&frequency=weekly&sort[0][column]=period&sort[0][direction]=desc&api_key=' . $this->api_key . '&facets[series][]=EMM_EPMR_PTE_NUS_DPG&facets[series][]=EMM_EPMR_PTE_R10_DPG&facets[series][]=EMM_EPMR_PTE_R1X_DPG&facets[series][]=EMM_EPMR_PTE_R1Y_DPG&facets[series][]=EMM_EPMR_PTE_R1Z_DPG&facets[series][]=EMM_EPMR_PTE_R20_DPG&facets[series][]=EMM_EPMR_PTE_R30_DPG&facets[series][]=EMM_EPMR_PTE_R40_DPG&facets[series][]=EMM_EPMR_PTE_R50_DPG&facets[series][]=EMM_EPMR_PTE_SCA_DPG&length=10');

                $diesel = $this->api_request('https://api.eia.gov/v2/petroleum/pri/gnd/data?data[]=value&frequency=weekly&sort[0][column]=period&sort[0][direction]=desc&api_key=' . $this->api_key . '&facets[series][]=EMD_EPD2DXL0_PTE_NUS_DPG&facets[series][]=EMD_EPD2DXL0_PTE_R10_DPG&facets[series][]=EMD_EPD2D_PTE_R1X_DPG&facets[series][]=EMD_EPD2DXL0_PTE_R1Y_DPG&facets[series][]=EMD_EPD2D_PTE_R1Z_DPG&facets[series][]=EMD_EPD2D_PTE_R20_DPG&facets[series][]=EMD_EPD2D_PTE_R30_DPG&facets[series][]=EMD_EPD2D_PTE_R40_DPG&facets[series][]=EMD_EPD2D_PTE_R50_DPG&facets[series][]=EMD_EPD2DXL0_PTE_R5XCA_DPG&facets[series][]=EMD_EPD2DXL0_PTE_SCA_DPG&length=11');

                // Store the data to json cache
                if (
                    !empty($gasoline) && count($gasoline) == 10 &&
                    !empty($diesel) && count($diesel) == 11
                ) {

                    // Creates the dir
                    if (!is_dir($base_dir)) {
                        wp_mkdir_p($base_dir);
                    }

                    // Save file to wp-uploads/usa-gas-prices
                    file_put_contents($file_name, json_encode(array('gasoline' => $gasoline, 'diesel' => $diesel)));
                }
            }

            wp_send_json(array(
                'status' => 'success',
                'gasoline' => $gasoline,
                'diesel' => $diesel,
            ));
        } catch (\Exception $e) {

            wp_send_json(array(
                'status' => 'error',
                'message' => $e->getMessage()
            ));
        }
    }

    /**
     * API request helper
     *
     * @since 1.0
     * @access public
     */
    public function api_request($url)
    {

        try {

            $response = wp_remote_get($url, array(
                'timeout' => 300
            ));

            $data = json_decode($response['body'])->response->data;
            $updated = array();

            foreach ($data as $key => $item) {
                $item->period = date("m/d/y", strtotime($item->period));
                $updated[$item->{'area-name'}][] = $item;
            }

            ksort($updated, SORT_NUMERIC);

            // Turn std object to plain array
            return json_decode(json_encode($updated), true);
        } catch (\Exception $e) {
            new \WP_Error('api_request', $e->getMessage());
        }
    }
}
